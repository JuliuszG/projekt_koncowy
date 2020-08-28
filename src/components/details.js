import React, {useState, useEffect, useContext} from 'react';
import { Redirect, Link } from 'react-router-dom';
import {AuthContext} from '../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImdb } from "@fortawesome/free-brands-svg-icons"
import Loader from './loader';
import Navigation from './navigation';
import { Button } from '@material-ui/core';

const Details = ({location}) => {
    const {user} = useContext(AuthContext);
    const [movie, setMovie] = useState(false)
    const [pending, setpending] = useState(false);
    const {state} = location;
    const key = "c8bb8ba6"; 
    useEffect(() => {
        setpending(true);
        if(state){
            const {id} = state;
            fetch(`http://www.omdbapi.com/?apikey=${key}&i=${id}`)
            .then(succes => succes.json())
            .then(data =>  setMovie({
                ...data
            }))
            .then(() => setpending(false));
        }
    }, []);
    const movieInfo = movie ? (
        <> 
            <div style={{height: "100vh", color: "#fff", zIndex: "55"}}
         className={"container-fluid overflow-auto p-5"}
         >
            <div className="row">
                <img alt="poster" src={movie.Poster} style={{height: '80%'}} className={"d-block col-sm-12 col-md-10 col-lg-4 mr-2 ml-2 image-fluid"} />
                <div className={"review-content col-sm-12 col-md-12 col-lg-7 p-2"}>
                <div className={"movie-details-title"}>
                    <h2>{movie.Title}</h2>
                    <p>({movie.Year})</p>
                </div>
                <div className={"movie-details-details"}>
                    <ul>
                        <li>{movie.Rated}</li>
                        <li>{movie.Runtime}</li>
                        <li>{movie.Genre}</li>
                        <li>{movie.Released}</li>
                    </ul>
                </div>
                {movie.Ratings.length === 3 ? (
                      <div className={"movie-details-ratings"}>
                      <div className={'imdb-rating'}>
                      <FontAwesomeIcon style={{marginRight: 10}} color={"#E0D500"} size={"2x"} icon={faImdb} />
                          {movie.Ratings[0].Value}
                      </div>
                      <div className={'mc-rating'}>
                          <h4 style={{marginRight: 10}}>Metacritic: </h4>
                          <div className={"mc-box"}>
                            {movie.Ratings[2].Value}
                          </div>
                      </div>
                  </div>
                ) : null}
                <div className={"movie-details-plot"}>
                    <p>{movie.Plot}</p>
                </div>
                <div className={"movie-details-cast&crew"}>
                    <div className={"movie-details-director"}>
                        <h2>Reżyseria:</h2> <p>{movie.Director}</p>
                    </div>
                    <div className={"movie-details-writer"}>
                        <h2>Scenariusz:</h2> <p>{movie.Writer}</p>
                    </div>
                    <div className={"movie-details-actors"}>
                        <h2>Obsada:</h2> <p>{movie.Actors}</p>
                    </div>
                </div>
                <div className="btn-cnt-det">
                <Button variant="contained" color="secondary" component={Link} to={{
                pathname: `/addreview`,
                state: { 
                    id: movie.imdbID,
                    title: movie.Title,
                    poster: movie.Poster
                    }
                }}>Dodaj swoją recenzję</Button>
                </div>
            </div>
        </div>
        </div>
        </>
    ) : null;
    const isAuth = user ? (
            <>
                <Navigation />
                {movieInfo}
            </>
    ) : <Redirect to="/login" />;
    const content = pending ? <Loader /> : isAuth;
    return state ? content : <Redirect to="/search" />;
}

export default Details;