import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/context';
import { Redirect } from 'react-router-dom';
import Navigation from './navigation';
import Rating from '@material-ui/lab/Rating';

const Review = ({location}) => {
    const { user } = useContext(AuthContext);
    const [review, setreview] = useState(false);
    const {state} = location;
    useEffect(() => {
        if(state){
            const {review} = state;
            setreview(review);
        }
    }, [state])

    const content = state ? (
        <>
        <Navigation />
        <div style={{height: "100vh", color: "#fff", zIndex: "55"}}
         className={"container-fluid overflow-auto p-5"}
         >
            <div className="row">
                <img alt="poster" src={review.poster} style={{height: '80%'}} className={"d-block col-sm-12 col-md-10 col-lg-4 mr-2 ml-2 image-fluid"} />
                <div className={"review-content col-sm-12 col-md-12 col-lg-7 p-2"}>
                    <h2>{review.title}</h2>
                    <h4>{review.movieTitle}</h4>
                    <Rating 
                        name="half-rating"
                        value={Number(review.score)}
                        precision={0.5} 
                        readOnly
                    />
                    <p className="font-italic">Recenzja napisana przez : {review.author}</p>
                    <p style={{lineHeight: "1.6rem"}}>{review.content}</p>
                </div>
            </div>
        </div>
        </>
    ) : <Redirect to="/" />;
    const isAuth = user ? content : <Redirect to="/login" />;

    return isAuth;
}

export default Review;