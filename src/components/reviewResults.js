import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/context';
import { Redirect, Link } from 'react-router-dom';
import Loader from './loader';
import Navigation from './navigation';
import Rating from '@material-ui/lab/Rating';
import { Button } from '@material-ui/core';


const ReviewResults = ({location}) => {
    const { state } = location;
    const { user } = useContext(AuthContext);
    const [reviews, setreviews] = useState(false)
    const [pending, setpending] = useState(false)
    useEffect(() => {
        setpending(true);
        if(state){
            setreviews(state.data);
            setpending(false);
        }      
    }, [state])
    const content = (
        <>
        <Navigation />
        <div style={{height: "100vh", zIndex: 200, color: "white"}} 
        className="container-fluid overflow-auto p-5 d-flex flex-column align-items-center justify-content-start">
            {reviews.length > 0 ? reviews.map((el, i) => (
                <div className="result" key={i}>
                    <div>
                    <h4>{el.title}</h4>
                    <h5>{el.movieTitle}</h5>
                    <p>Autor: {el.author}</p>
                    </div>
                    <Rating 
                        style={{margin: "0 10px"}}
                        name="half-rating"
                        value={Number(el.score)}
                        precision={0.5} 
                        readOnly
                    />
                    <Button variant="contained" color="secondary" component={Link} to={{
                                pathname: '/review',
                                state: { review: el }
                            }}>Czytaj więcej</Button>
                </div>
            )) : <p>Brak recenzji</p>}
        </div>
        </>
    );
    const isLoading = pending ? <Loader /> : content;
    const isAuth = user ? isLoading : <Redirect to="/login" />;
    return state ? isAuth : <Redirect to="/search-review" />;
}

export default ReviewResults;
