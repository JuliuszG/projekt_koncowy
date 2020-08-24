import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import AuthProvider from './context/context';
import Register from './components/register';
import Login from './components/login';
import Main from './components/main';
import Search from './components/search';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Dashboard from './components/dashboard';
import Results from './components/results';
import Details from './components/details';


const App = () => {
  
  return(
  <AuthProvider>
    <section id="landing">
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/search' component={Search} />
          <Route path='/results' component={Results} />
          <Route path='/details' component={Details} />
      </Switch>
      </HashRouter> 
    </section>
  </AuthProvider>
)};

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
