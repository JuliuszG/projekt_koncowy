import React, {useContext, useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import {AuthContext} from '../context/context';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Results =({location}) => {
const {user, logOut} = useContext(AuthContext);
const [data, setdata] = useState(false)
const {state} = location;
useEffect(() => {
    if(state){
        const {data, inps} = state;
        setdata({
            data,
            inps
        })
    }
}, []);

const title = data ? data.inps.title : null;
const year = data ? data.inps.year : null;
const resultTrue = data ? (
    data.data !== 404 ? (
    <>
        <h1 className={"results-title"}>Wyniki Wyszukiwania dla {title} {year}</h1>
        <ul className={"results-list"}>
            {data.data.map((el, i) => (
            <li key={i}>
              <Link to={{
                pathname: `/details`,
                state: { 
                    id: el.imdbID
                    }
                }}>
                    <img src={el.Poster} alt={"poster"} /> 
                    <div className={"link-movie-title"}>
                        <h2>{el.Title}</h2>
                        <p className={"results-small"}>({el.Year})</p>
                        </div> 
                </Link>
                <button><FavoriteIcon/></button>
            </li>))}
        </ul>
    </>
    ) : (
        <h1 className={"results-not-found"}>Nie znaleziono żadnych filmów</h1>
    )
)
 :  <h1 className={"results-not-found"}>Nie znaleziono żadnych filmów</h1>;
 const content = user ? (
    <div className={"results-container"}>
        <Link className="bck-btn" to="/search">Wróć</Link>  
        <button className="form-back-link" onClick={e => logOut(e)}>Wyloguj</button>
        <main>
            {resultTrue}
        </main>
    </div> 
) :  <Redirect to="/login" />;
    return state ? content : <Redirect to="/search" />;
}

export default Results;
