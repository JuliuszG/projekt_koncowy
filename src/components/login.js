import React, { useState, useContext } from 'react';
import {AuthContext} from '../context/context';
import { fireBase } from '../config/config';
import {Redirect, Link} from 'react-router-dom';
import {validateMail, validatePassword} from '../config/validation';
import Loader from './loader';

const Login = ()=>{
const [inps, setInp] = useState({
    username: false,
    password: false
});
const [error, setError] = useState(false);
const [pending, setpending] = useState(false);

const handleChange = ({name, value}) => {
    if(error){
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
    if(validateMail(inps.username) && validatePassword(inps.password,6,15)){
        fireBase.auth().signInWithEmailAndPassword(inps.username, inps.password)
        .catch(() => {
            setpending(false);
                setError("Błędny email lub hasło");
        })
    } else {
        setpending(false);
        setError("Błędny email lub hasło");
    };     
};

const loginForm = pending ? <Loader /> :(
    <>
        <Link className={"form-back-link"} to="/">Strona Główna</Link>
        <div className={"form-container"}>
            <h1>Logowanie</h1>
            <form onSubmit={e => handleSubmit(e)}>
            <div className={"input-cnt"}>
                        <input type={"text"} name={"username"} id={"username-input-login"}
                         onChange={e => handleChange(e.target)} 
                         placeholder={" "}/>
                        <label htmlFor={"username-input-login"}>Email</label>
                    </div>
                    <div className={"input-cnt"}>
                        <input type={"password"} name={"password"} id={"password-input-login"} 
                        onChange={e => handleChange(e.target)} 
                        placeholder={" "}/>
                        <label htmlFor={"username-input-login"}>Hasło</label>
                    </div>
                    <div className={"form-btn-cnt"}>
                        <button type={"submit"}>Zaloguj się</button>
                        <Link className={"form-small-link"} to="/register">Nie masz konta ?</Link>
                    </div>
            </form>
            {error ? <div className="form-error">{error}</div> : null}
        </div>
    </>
    );

const content = user ? (<><Redirect to="/dashboard" /></>) : loginForm;

return content;
}

export default Login;