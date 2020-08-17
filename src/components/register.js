import React, { useState, useContext } from 'react';
import {AuthContext} from '../context/context';
import { fireBase } from '../config/config';
import {Redirect} from 'react-router-dom';


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
    
    const handleChange = ({name, value}) => {
        setInp(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const validatePassword = i => {
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
                    usernameError: "niepoprawna nazwa użytkownika"
                }))
            } else {
                setError(prevState => ({
                    ...prevState,
                    usernameError: false
                }))
            }
        }
    }
    const validateAll = ()=> {
        // eslint-disable-next-line
        const regEx = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(inps.password.length > 6 
            && inps.password.length < 15
            && inps.passwordRepeat === inps.password
            && regEx.test(inps.username)){
                return true
            } else {
                return false
            }
    }
    const handleBlur = ({name}) => {
        if(name === "username"){
           validatePassword("username");
        }
        if(name === "password"){
        validatePassword("password");
        }
        if(name === "passwordRepeat"){
        validatePassword("passwordRepeat");
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateAll()){
            fireBase.auth().createUserWithEmailAndPassword(inps.username, inps.password)
            .catch(error => {
                if(error){
                    setError(prevState => ({
                        ...prevState,
                        fbError: "Takie konto już istnieje"
                    }))
                }
            })
        } else {
            validatePassword("username");
            validatePassword("password");
            validatePassword("passwordRepeat");
        }     
    }
    const {user} = useContext(AuthContext);
    const registerForm = 
         (<section id={"register-form"}>
            <div className={"container"}>
                <form onSubmit={e => handleSubmit(e)}>
                {error.fbError ? <h2>{error.fbError}</h2> : null}
                    <div className={"input-cnt"}>
                        <input type={"text"} name={"username"} id={"username-input"}
                         onChange={e => handleChange(e.target)}  onBlur={e => handleBlur(e.target)}/>
                        <label htmlFor={"username-input"}>Nazwa Użytkownika</label>
                        {error.usernameError ? <h2>{error.usernameError}</h2> : null}
                    </div>
                    <div className={"input-cnt"}>
                        <input type={"password"} name={"password"} id={"password-input"} 
                        onChange={e => handleChange(e.target)}  onBlur={e => handleBlur(e.target)}/>
                        <label htmlFor={"username-input"}>Hasło</label>
                        {error.passwordError ? <h2>{error.passwordError}</h2> : null}
                    </div>
                    <div className={"input-cnt"}>
                        <input type={"password"} name={"passwordRepeat"} id={"password-repeat-input"} 
                        onChange={e => handleChange(e.target)}  onBlur={e => handleBlur(e.target)}/>
                        <label htmlFor={"username-repeat-input"}>Powtórz Hasło</label>
                        {error.passwordRepeatError ? <h2>{error.passwordRepeatError}</h2> : null}
                    </div>
                    <button type={"submit"}>Rejestruj się</button>
                </form>
            </div>
        </section>);
    const content = user ? <Redirect to="/" /> : registerForm;
    return content;
}

export default Register;