import React, {useContext} from 'react';
import {AuthContext} from '../context/context';

const Dashboard = () =>{
    const {user, logOut} = useContext(AuthContext);

    return(
        <>
        <button onClick={e => logOut(e)}>Wyloguj</button>
        </>
    )
}

export default Dashboard;