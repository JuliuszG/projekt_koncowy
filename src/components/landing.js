import React from 'react';
import {Button} from '@material-ui/core';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import TheatersIcon from '@material-ui/icons/Theaters';


const Landing = () => {
    const btnStyle = {
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 400
    }
    return(
    <>
    <div className="logo"><TheatersIcon style={{fontSize: "2.8rem"}}/><h1>
        <span style={{color: "#f50057"}}>Hejter</span> Filmowy</h1>
        </div>
    <Button size="large" variant="contained" color="secondary"
                style={btnStyle}
                component={Link}
                to="/login">
                    Zaloguj się
                </Button>
        <Jumbotron  style={{zIndex: 500}}>
            <Container>
                <h2>Zostań Hejterem !</h2>
                <p>Cieżko idzie w pracy?      
                zupa była za słona? a może męczy sie kac po wczorajszym ?</p>
                <h5>
                   U nas masz okazję wyładować swoją agresję, recenzując film, który zawsze chciałeś zjechać.
                </h5>
                <Button size="large" variant="contained" color="secondary"
                component={Link}
                to="/register">
                    Dołącz do nas
                </Button>
            </Container>
        </Jumbotron>
    </>
)};

export default Landing;
