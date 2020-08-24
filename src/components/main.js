import React, {useContext} from 'react';
import {AuthContext} from '../context/context';
import Dashboard from '../components/dashboard';
import Landing from '../components/landing';
import {Link, Redirect} from 'react-router-dom';


const Main = ()=> {
    const {user} = useContext(AuthContext);
    return(
      <>
        {user ? <Redirect to="/dashboard"/> : <Landing Link={Link}/>}
     </>
    )
  };
  
export default Main;