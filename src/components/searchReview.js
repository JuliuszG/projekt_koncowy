import React, {useState, useContext} from 'react';
import {AuthContext} from '../context/context';
import Navigation from './navigation';
import {fireBase} from '../config/config';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import Loader from './loader';

const SearchReview = () => {

    const {user} = useContext(AuthContext);
    const [inp, setinp] = useState(null);
    const [pending, setpending] = useState(false);
    const [data, setdata] = useState([]);
    const [dataRecived, setdataRecived] = useState(false);
    const db = fireBase.firestore().collection("Reviews");

    const handleSubmit = e => {
        e.preventDefault();
        setpending(true);
        if (inp !== null || inp !== "") {
            db.where("movieTitle", "==", inp).get().then(snapshot => snapshot.docs.forEach(el => setdata(prevState => {
                return [
                    ...prevState,
                    el.data()
                ]
            }))).then(() => {
                setpending(false);
                setdataRecived(true);
            });
        }
    }
    const content = !dataRecived ? (
        <>
            <Navigation/>
            <div style={
                    {
                        color: "#fff",
                        zIndex: "55",
                    }
                }
                className={"container w-50"}>
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group controlId="text">
                        <Form.Label>Tytuł</Form.Label>
                        <Form.Control 
                         required 
                         size="lg"
                         type="text"
                         placeholder="Wpisz tytuł filmu"
                         onChange={e => setinp(e.target.value)}
                          />
                    </Form.Group>
                    <Button variant="info" size="lg" type="submit">
                        Szukaj
                    </Button>
                </Form>
            </div>
        </>
    ) : <Redirect to={{
        pathname: '/review-results',
        state: { data }
    }} />;
    const isLoaded = pending ? <Loader /> : content;
    const isAuth = user ? isLoaded : <Redirect to="/login" />
    return isAuth;
}


export default SearchReview;
