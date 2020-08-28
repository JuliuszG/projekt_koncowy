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
import CreateReview from './components/createReview';
import 'bootstrap/dist/css/bootstrap.min.css';
import Review from './components/review';
import SearchReview from './components/searchReview';
import ReviewResults from './components/reviewResults';

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
          <Route path='/addreview' component={CreateReview} />
          <Route path='/review' component={Review} />
          <Route path='/search-review' component={SearchReview} />
          <Route path='/review-results' component={ReviewResults} />
      </Switch>
      </HashRouter> 
    </section>
  </AuthProvider>
)};

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
