import React, { useState, useEffect } from 'react';
import { fireBase } from '../config/config';
import {Redirect} from 'react-router-dom';
import Loader from '../components/loader';

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [pending, setPending] = useState(true);

    const logOut = e => {
        e.preventDefault();
        if(user){
            fireBase.auth().signOut().then(()=>{
               return <Redirect to="/" />
            })
        }
    }

    useEffect(() => {
        fireBase.auth().onAuthStateChanged((user) => {
          setUser(user)
          setPending(false)
        });
      }, []);

    if(pending){
        return <Loader />
    }
    
    return (
        <AuthContext.Provider value={{user, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;