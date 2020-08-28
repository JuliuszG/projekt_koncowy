import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../context/context';
import { Redirect } from 'react-router-dom';
import Loader from './loader';
import Rating from '@material-ui/lab/Rating';
import {fireBase} from '../config/config';
import Navigation from './navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'



const CreateReview = ({location}) => {
    
    const {user} = useContext(AuthContext);
    const [movie, setmovie] = useState(false);
    const [pending, setpending] = useState(false);
    const [error, seterror] = useState(false)
    const [sent, setsent] = useState(false)
    const {state} = location;
    const db = fireBase.firestore();

    const [inps, setinps] = useState({
        title: null,
        content: null,
        score: 0,
        author: user.email
    })
    
    useEffect(() => {
        if(state){
            setpending(true);
            const {id, title, poster} = state;
            setmovie({
                id,
                title,
                poster
            })  
        }
        setpending(false);
    }, [state]);
    const handleChange = ({name, value}) => {
        setinps(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(inps.title !== null && inps.content !== null) {

            if(inps.title.length > 4 && inps.content.length > 160){
                
                setpending(true);
                db.collection("Reviews").add({
                    title: inps.title,
                    content: inps.content,
                    score: inps.score,
                    author: inps.author,
                    movieTitle: movie.title,
                    poster: movie.poster,
                    movieID: movie.id,
                    dateAdded: new Date()
                }).then(()=> setsent(true));

            } else {
                seterror("Za krótki tytuł lub treść");
                console.log(error);
            }

        } else {
            seterror("Pola nie mogą być puste");
        }
       
    }
    const content = pending ? <Loader /> : (
          <>
            <Navigation />
            <div style={
                    {
                        color: "#fff",
                        zIndex: "55",
                    }
                }
                className={"container w-50"}>
                    <h2 style={{marginBottom: 20}}>Recenzujesz {movie.title}</h2>
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group controlId="text">
                        <Form.Label>Tytuł</Form.Label>
                        <Form.Control 
                         required 
                         size="lg"
                         type="text"
                         name="title"
                         placeholder="Wpisz tytuł filmu"
                         onChange={e => handleChange(e.target)}
                          />
                    </Form.Group>
                    <Form.Group controlId="text">
                        <Form.Label>Treść</Form.Label>
                        <Form.Control 
                         required 
                         style={{resize: "none"}}
                         size="lg"
                         type="text"
                         as="textarea"
                         rows="8"
                         name="content"
                         placeholder="Wpisz tytuł filmu"
                         onChange={e => handleChange(e.target)}
                          />
                    </Form.Group>
                    <Rating 
                    name="half-rating"
                    style={{marginBottom: 10}}
                    defaultValue={2.5}
                    precision={0.5} 
                    onChange={ e =>  setinps(prevState => ({...prevState, score: e.target.value}))}/>
                    <br />
                    <Button variant="info" size="lg" type="submit">
                        Wyślij
                    </Button>
                </Form>
            </div>
            </>);
    const isSent = sent ? <Redirect to="/dashboard" /> : content;
    const isAuth = user ? isSent : <Redirect to="/login" />

    return state ? isAuth : <Redirect to="/search" />;
}

export default CreateReview;