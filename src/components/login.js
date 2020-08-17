import React, { useState, useContext } from 'react';
import {AuthContext} from '../context/context';
import { fireBase } from '../config/config';
import {Redirect, Link} from 'react-router-dom';

const Login = ()=>{
const [inps, setInp] = useState({
    username: false,
    password: false
})
const [error, setError] = useState(false);
const [loading, setloading] = useState(false);

const validateAll = ()=> {
    // eslint-disable-next-line
    const regEx = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(inps.password.length > 6 
        && inps.password.length < 15
        && regEx.test(inps.username)){
            return true
        } else {
            return false
        }
}

const handleChange = ({name, value}) => {
    if(error){
        setError(false);
    }
    setInp(prevState => ({
        ...prevState,
        [name]: value
    }))
}
const {user} = useContext(AuthContext);

const handleSubmit = e => {
    e.preventDefault();
    if(validateAll()){
        fireBase.auth().signInWithEmailAndPassword(inps.username, inps.password)
        .then(()=> setloading(true))
        .catch(error => {
                setError("Błędny email lub hasło");
        })
    } else {
        setError("Błędny email lub hasło")
    }     
}

const loginForm = 
    (<section id={"login"}>
        <Link className={"login-back-link"} to="/">Strona Główna</Link>
        <div className={"container"}>
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
                    <div className={"login-btn-cnt"}>
                        <button type={"submit"}>Zaloguj się</button>
                        <Link className={"login-small-link"} to="/register">Nie masz konta ?</Link>
                    </div>
            </form>
            {error ? <div className="login-error">{error}</div> : null}
        </div>
    </section>)

const content = user ? (<><Redirect to="/" /></>) : loginForm;

return content;
}

export default Login;