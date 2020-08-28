import React, { useState, useContext } from 'react';
import {AuthContext} from '../context/context';
import { fireBase } from '../config/config';
import {Redirect, Link} from 'react-router-dom';
import {validateMail, validatePassword, matchPasswords} from '../config/validation';
import Loader from './loader';
import { Button } from '@material-ui/core';
import Form from 'react-bootstrap/Form';


const Register = ()=>{
    const [inps, setInp] = useState({
        username: false,
        password: false,
        passwordRepeat: false,
    })
    const [error, setError] = useState({
        usernameError: false,
        passwordError: false,
        passwordRepeatError: false,
        fbError: false
    })
    const [pending, setpending] = useState(false);
    const handleChange = ({name, value}) => {
        setInp(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const validateInputField = i => {
        if(i === "password"){
            if(inps.password.length < 6){
                setError(prevState => ({
                    ...prevState,
                    passwordError: 'Hasło jest za krótkie (minimalnie 6 znaków)'
                }))
            } else if (inps.password.length > 15) {
                setError(prevState => ({
                    ...prevState,
                    passwordError: 'Hasło jest za długie (maksymalnie 15 znaków)'
                }))
            } else {
                setError(prevState => ({
                    ...prevState,
                    passwordError: false
                }))
            }
        } 
        if(i === "passwordRepeat"){
            if(inps.passwordRepeat !== inps.password){
                setError(prevState => ({
                    ...prevState,
                    passwordRepeatError: "Wpisane hasła różnią się od siebie"
                }))
            } else {
                setError(prevState => ({
                    ...prevState,
                    passwordRepeatError: false
                }))
            }
        }
        if(i === "username"){
            // eslint-disable-next-line
            const regEx = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if(!regEx.test(inps.username)){
                setError(prevState => ({
                    ...prevState,
                    usernameError: "niepoprawny email"
                }))
            } else {
                setError(prevState => ({
                    ...prevState,
                    usernameError: false
                }))
                console.log(error);
            }
        }
    }

    // const handleBlur = ({name}) => {
    //     if(name === "username"){
    //         validateInputField("username");
    //     }
    //     if(name === "password"){
    //         validateInputField("password");
    //     }
    //     if(name === "passwordRepeat"){
    //         validateInputField("passwordRepeat");
    //     }
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateMail(inps.username) && 
        validatePassword(inps.password,6,15) && 
        matchPasswords(inps.password, inps.passwordRepeat)){
            setpending(true);
            fireBase.auth().createUserWithEmailAndPassword(inps.username, inps.password)
            .catch(() => {
                    setError(prevState => ({
                        ...prevState,
                        fbError: "Takie konto już istnieje"
                    }))
            })
        } else {
            validateInputField("username");
            validateInputField("password");
            validateInputField("passwordRepeat");
        }     
    }
    const btnStyle = {
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 400
    }
    const {user} = useContext(AuthContext);
    const registerForm = pending ? <Loader /> :
         (<>
            <Button size="large" variant="contained" color="secondary" style={btnStyle} component={Link} to="/">Wróć</Button>
    <div style={
                    {
                        color: "#fff",
                        zIndex: "55",
                    }
                }
                className={"container w-25"}>
                    <h1>Logowanie</h1>
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group controlId="text">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                         required 
                         size="lg"
                         name="username"
                         type="text"
                         placeholder="Wpisz swój email"
                         onChange={e => handleChange(e.target)}
                          />
                    </Form.Group>
                    <Form.Group controlId="pass">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control 
                         required 
                         size="lg"
                         name="password"
                         type="password"
                         placeholder="Wpisz swoje hasło"
                         onChange={e => handleChange(e.target)}
                          />
                    </Form.Group>
                    <Form.Group controlId="pass">
                        <Form.Label>Powtórz Hasło</Form.Label>
                        <Form.Control 
                         required 
                         size="lg"
                         name="passwordRepeat"
                         type="password"
                         placeholder="Powtórz hasło"
                         onChange={e => handleChange(e.target)}
                          />
                    </Form.Group>
                    <Button variant="contained" size="large" color="secondary" type="submit">
                       Zarejestruj się
                    </Button>
                </Form>
            </div>
        </>);
    const content = user ? <Redirect to="/" /> : registerForm;
    return content;
}

export default Register;