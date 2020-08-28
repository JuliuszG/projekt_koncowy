import React, {useState, useContext} from 'react';
import {AuthContext} from '../context/context';
import {fireBase} from '../config/config';
import {Redirect, Link} from 'react-router-dom';
import {validateMail, validatePassword} from '../config/validation';
import Loader from './loader';
import {Button} from '@material-ui/core';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const [inps, setInp] = useState({username: false, password: false});
    const [error, setError] = useState(false);
    const [pending, setpending] = useState(false);

    const handleChange = ({name, value}) => {
        if (error) {
            setError(false);
        };
        setInp(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const {user} = useContext(AuthContext);

    const handleSubmit = e => {
        e.preventDefault();
        setpending(true);
        if (validateMail(inps.username) && validatePassword(inps.password, 6, 15)) {
            fireBase.auth().signInWithEmailAndPassword(inps.username, inps.password).catch(() => {
                setpending(false);
                setError("Błędny email lub hasło");
            })
        } else {
            setpending(false);
            setError("Błędny email lub hasło");
        };
    };
    const btnStyle = {
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 400
    }
    const loginForm = pending ? <Loader/>: (
        <>
            <Button size="large" variant="contained" color="secondary"
                style={btnStyle}
                component={Link}
                to="/">Wróć</Button>
            <div style={
                    {
                        color: "#fff",
                        zIndex: "55"
                    }
                }
                className={"container w-25"}>
                <h1>Logowanie</h1>
                <Form onSubmit={
                    e => handleSubmit(e)
                }>
                    <Form.Group controlId="text">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required size="lg" name="username" type="text" placeholder="Wpisz swój email"
                            onChange={
                                e => handleChange(e.target)
                            }/>
                    </Form.Group>
                    <Form.Group controlId="pass">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control required size="lg" name="password" type="password" placeholder="Wpisz swój email"
                            onChange={
                                e => handleChange(e.target)
                            }/>
                    </Form.Group>
                    <Button variant="contained" size="large" color="secondary" type="submit">
                        Zaloguj się
                    </Button>
                </Form>
            </div>
        </>
    );

    const content = user ? (
        <><Redirect to="/dashboard"/></>
    ) : loginForm;

    return content;
}

export default Login;
