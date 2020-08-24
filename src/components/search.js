import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/context';
import {Link, Redirect} from 'react-router-dom';
import Loader from './loader';

const Search = () => {
    const {user, logOut} = useContext(AuthContext);
    const [inps, setInp] = useState({
        title: false,
        year: false,
        query: false
    });
    const [data, setdata] = useState(false)
    const key = "c8bb8ba6";
    const [pending, setpending] = useState(false);
    const [error, seterror] = useState(false);
    const handleChange =({name, value}) => {
        setInp(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(inps.title && !inps.year){
            setpending(true);
            setInp(prevState => ({...prevState, query: `http://www.omdbapi.com/?apikey=${key}&s=${inps.title}`}))
            fetch(`http://www.omdbapi.com/?apikey=${key}&s=${inps.title}`)
            .catch(error => console.log(error))
            .then(success =>  success.json())
            .then(data => !data.Error ? setdata(data.Search) : (setdata(404)));
        } else if(inps.title && inps.year){
            setpending(true);
            setInp(prevState => ({...prevState, query: `http://www.omdbapi.com/?apikey=${key}&s=${inps.title}&y=${inps.year}`}))
            fetch(`http://www.omdbapi.com/?apikey=${key}&s=${inps.title}&y=${inps.year}`)
            .catch(error => console.log(error))
            .then(success =>  success.json())
            .then(data => !data.Error ? setdata(data.Search) : (setdata(404)));
        } else if(!inps.title && inps.year){
            console.log("wpisz tytuł");
        } else {
            seterror("Musisz wpisać przynajmniej tytuł");
        }
    }
    const content = user ? (
        <>
        <Link className="bck-btn" to="/">Wróć</Link>           
        <button className="form-back-link" onClick={e => logOut(e)}>Wyloguj</button>
            <div className={"form-container"}>
                <form onSubmit={e => handleSubmit(e)}>
            <div className={"input-cnt"}>
                        <input 
                            type={"text"} 
                            name={"title"} 
                            id={"title-input"}
                            onChange={e => handleChange(e.target)}  
                            placeholder={" "}
                        />
                        <label htmlFor={"title-input"}>Tytuł</label>                       
                    </div>
                    <div className={"input-cnt"}>
                        <input 
                            type={"number"} 
                            name={"year"} 
                            id={"year-input"}
                            onChange={e => handleChange(e.target)}  
                            placeholder={" "}
                            min={1920}
                        />
                        <label htmlFor={"year-input"}>Rok Produkcji</label>                       
                    </div>
                    <div className={"form-btn-cnt"}>
                        <button type={"submit"}>Szukaj</button>
                    </div>
                    {error ? <h2 className={"form-error"}>{error}</h2> : null}
                </form>
            </div>
            </>
    ) : (
        <Redirect to="/login" />
    )
    const result = pending ? <Loader /> : content;
    return data ? (<Redirect to={{
        pathname: '/results',
        state: { data, inps}
    }} />): result;
}

export default Search;
