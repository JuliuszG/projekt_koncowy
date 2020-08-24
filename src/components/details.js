import React, {useState, useEffect, useContext} from 'react';
import { Redirect, Link } from 'react-router-dom';
import {AuthContext} from '../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImdb } from "@fortawesome/free-brands-svg-icons"
import FavoriteIcon from '@material-ui/icons/Favorite';
import Loader from './loader';

const Details = ({location}) => {
    const {user, logOut} = useContext(AuthContext);
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
            <img src={movie.Poster} alt="poster" />
            <div className={"movie-details"}>
                <div className={"movie-details-title"}>
                    <h2>{movie.Title}</h2>
                    <p>{movie.Year}</p>
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
                      <FontAwesomeIcon color={"#E0D500"} size={"2x"} icon={faImdb} />
                          {movie.Ratings[0].Value}
                      </div>
                      <div className={'mc-rating'}>
                          <h2>Metacritic: </h2>
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
                <div className={"btn-cnt-det"}>
                <button>Dodaj swoją recenzję</button>
                </div>   
            </div>
                
        </>
    ) : null;
    const isAuth = user ? (
        <div className={"details-container"}>
            <Link className="bck-btn" to="/search">Wróć</Link>  
            <button className="form-back-link" onClick={e => logOut(e)}>Wyloguj</button>
            <main>
                {movieInfo}
            </main>
        </div> 
    ) : <Redirect to="/login" />;
    const content = pending ? <Loader /> : isAuth;
    return state ? content : <Redirect to="/search" />;
}

export default Details;
