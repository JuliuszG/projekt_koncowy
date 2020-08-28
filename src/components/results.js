import React, {useContext, useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import {AuthContext} from '../context/context';
import Pagination from '@material-ui/lab/Pagination';
import Image from 'material-ui-image'
import Navigation from './navigation';
import { Button } from '@material-ui/core';

const Results =({location}) => {
const { user } = useContext(AuthContext);
const [data, setdata] = useState(false);
const [page, setPage] = useState(1);
const [pagPages, setpagPages] = useState(false)
  const handleChange = (event, value) => {
    setPage(value);
  }
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
useEffect(() => {
    if(data) setpagPages(Math.round(Number(data.inps.results) / 10));
}, [data])
useEffect(() => {
    if(data){
        fetch(`${data.inps.query}&page=${page}`)
        .catch(error => console.log(error))
        .then(success =>  success.json())
        .then(data => setdata(prevState => ({
            ...prevState,
            data: data.Search
        })));
}
}, [page]);
const title = data ? data.inps.title : null;
const resultTrue = data ? (
    data.data !== 404 ? (
        <>
            {data.data.map((el, i) => (
                <div className="result" style={{width: "80%"}} key={i}>
                    <div style={{width: 120, height: 150}}>
                    <Image aspectRatio={0.8} src={el.Poster} alt="poster"/>
                    </div>
                    <h4>{el.Title}({el.Year})</h4>
                    <Button variant="contained" color="secondary" component={Link} to={{
                            pathname: '/details',
                            state: { id: el.imdbID }
                        }}>Czytaj więcej</Button>
                </div>
            ))}
        </>
    ) : (
        <h1 className={"results-not-found"}>Nie znaleziono żadnych filmów</h1>
    )
)
 :  <h1 className={"results-not-found"}>Nie znaleziono żadnych filmów</h1>;
 const content = user ? (
    <>
            <Navigation />
        <div style={{height: "100vh", zIndex: 200, color: "white"}} 
        className="container-fluid overflow-auto p-5 d-flex flex-column align-items-center justify-content-start">
            <h2>Wyniki wyszukiwania dla {title}</h2>
            {resultTrue}
            {pagPages ? (<Pagination style={{marginTop: 20, background: "white"}}
             count={pagPages}
             shape="rounded"
             color="secondary" 
             page={page} 
             onChange={handleChange}/>) : null} 
        </div>    
    </> 
) :  <Redirect to="/login" />;
    return state ? content : <Redirect to="/search" />;
}

export default Results;