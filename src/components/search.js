import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/context';
import { Redirect } from 'react-router-dom';
import Loader from './loader';
import Navigation from './navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Search = () => {
    const { user } = useContext(AuthContext);
    const [inps, setInp] = useState({
        title: false,
        year: false,
        query: false,
        results: false
    });
    const [data, setdata] = useState(false)
    const key = "c8bb8ba6";
    const [pending, setpending] = useState(false);
    const [error, seterror] = useState(false);
    const handleChange =({name, value}) => {
        setInp(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(inps.title && !inps.year){
            setpending(true);
            setInp(prevState => ({...prevState, query: `http://www.omdbapi.com/?apikey=${key}&s=${inps.title}`}))
            fetch(`http://www.omdbapi.com/?apikey=${key}&s=${inps.title}`)
            .catch(error => console.log(error))
            .then(success =>  success.json())
            .then(data => {
                if(!data.Error){
                    setInp(prevState => ({
                        ...prevState,
                        results: data.totalResults
                    }))
                    setdata(data.Search)
                } else {
                    setdata(404);
                } 
            });
        } else if(inps.title && inps.year){
            setpending(true);
            setInp(prevState => ({...prevState, query: `http://www.omdbapi.com/?apikey=${key}&s=${inps.title}&y=${inps.year}`}))
            fetch(`http://www.omdbapi.com/?apikey=${key}&s=${inps.title}&y=${inps.year}`)
            .catch(error => console.log(error))
            .then(success =>  success.json())
            .then(data => {
                if(!data.Error){
                    setInp(prevState => ({
                        ...prevState,
                        results: data.totalResults
                    }))
                    setdata(data.Search)
                } else {
                    setdata(404);
                } 
            });
        } else if(!inps.title && inps.year){
            console.log("wpisz tytuł");
        } else {
            seterror("Musisz wpisać przynajmniej tytuł");
        }
    }
    const content = user ? (
        <>
        <Navigation />
        <div style={
                    {
                        color: "#fff",
                        zIndex: "55",
                    }
                }
                className={"container w-50"}>
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tytuł*</Form.Label>
                        <Form.Control 
                         required 
                         size="lg"
                         name="title"
                         type="text"
                         placeholder="Wpisz tytuł filmu"
                         onChange={e => handleChange(e.target)}
                          />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Rok</Form.Label>
                        <Form.Control  
                         size="lg"
                         name="year"
                         type="number"
                         min="1920"
                         max="2020"
                         placeholder="Wpisz rok produkcji filmu"
                         onChange={e => handleChange(e.target)}
                          />
                    </Form.Group>
                    <div className="btn-cnt-center">
                    <Button variant="info" size="lg" type="submit">
                        Szukaj
                    </Button>
                    </div>
                    <p>Pola oznaczone * są wymagane</p>
                </Form>
            </div>
            </>
    ) : (
        <Redirect to="/login" />
    )
    const result = pending ? <Loader /> : content;
    return data ? (<Redirect to={{
        pathname: '/results',
        state: { data, inps}
    }} />): result;
}

export default Search;