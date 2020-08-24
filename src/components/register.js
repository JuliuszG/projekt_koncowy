import React, { useState, useContext } from 'react';
import {AuthContext} from '../context/context';
import { fireBase } from '../config/config';
import {Redirect, Link} from 'react-router-dom';
import {validateMail, validatePassword, matchPasswords} from '../config/validation';
import Loader from './loader';


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
            }
        }
    }

    const handleBlur = ({name}) => {
        if(name === "username"){
            validateInputField("username");
        }
        if(name === "password"){
            validateInputField("password");
        }
        if(name === "passwordRepeat"){
            validateInputField("passwordRepeat");
        }
    }
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
    const {user} = useContext(AuthContext);
    const registerForm = pending ? <Loader /> :
         (<>
            <Link className={"form-back-link"} to="/">Strona Główna</Link>
            <div className={"form-container"}>
                <h1>Rejestracja</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className={"input-cnt"}>
                        <input 
                            type={"text"} 
                            name={"username"} 
                            id={"username-input"}
                            onChange={e => handleChange(e.target)}  
                            onBlur={e => handleBlur(e.target)}
                            placeholder={" "}
                        />
                        <label htmlFor={"username-input"}>Email</label>                       
                    </div>
                    <div className={"input-cnt"}>
                        <input
                            type={"password"} name={"password"}
                            id={"password-input"} 
                            onChange={e => handleChange(e.target)}
                            onBlur={e => handleBlur(e.target)}
                            placeholder={" "}
                        />
                        <label htmlFor={"username-input"}>Hasło</label>                    
                    </div>
                    <div className={"input-cnt"}>
                        <input 
                            type={"password"} 
                            name={"passwordRepeat"} 
                            id={"password-repeat-input"} 
                            onChange={e => handleChange(e.target)}  
                            onBlur={e => handleBlur(e.target)}
                            placeholder={" "}
                        />
                        <label htmlFor={"username-repeat-input"}>Powtórz Hasło</label>
                    </div>
                    <div className={"form-btn-cnt"}>
                        <button type={"submit"}>Rejestruj się</button>
                    </div>
                </form>
                {error.passwordRepeatError ? <h2 className="form-error">{error.passwordRepeatError}</h2> : null}
                {error.passwordError ? <h2 className="form-error">{error.passwordError}</h2> : null}
                {error.usernameError ? <h2 className="form-error">{error.usernameError}</h2> : null}
                {error.fbError ? <h2 className="form-error">{error.fbError}</h2> : null}
            </div>
        </>);
    const content = user ? <Redirect to="/" /> : registerForm;
    return content;
}

export default Register;