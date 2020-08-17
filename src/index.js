import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import AuthProvider, {AuthContext} from './context/context';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Landing from './components/landing';
import {
  HashRouter,
  Route,
  Link,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom';

const Main = ()=>{
  const {user} = useContext(AuthContext);
  return(
    <>
      {user ? <Dashboard /> : <Landing Link={Link}/>}
   </>
  )
}

const App = () => {
  
  return(
  <AuthProvider>
    <HashRouter>
    <Route exact path='/' component={Main} />
    <Route path='/register' component={Register} />
    <Route path='/login' component={Login} />
    </HashRouter>
  </AuthProvider>
)};



ReactDOM.render(
    <App />,
  document.getElementById('root')
);
