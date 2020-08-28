import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/context';
import { Redirect, Link} from 'react-router-dom';
import {fireBase} from '../config/config';
import Carousel from 'react-bootstrap/Carousel';
import Loader from './loader';
import Navigation from './navigation';
import Rating from '@material-ui/lab/Rating';



const Dashboard = () => {
    const [pending, setpending] = useState(false);
    const [data, setdata] = useState([]);
    const db = fireBase.firestore();

    useEffect(() => {
        setpending(true)
        db.collection("Reviews").orderBy("dateAdded", "desc").limit(3).get()
        .then(snapshot => snapshot.docs.forEach(el => setdata(prevState => [...prevState, el.data()])))
        .then(() => setpending(false));
    }, [])

    const {user} = useContext(AuthContext);
    const content = user ? (
        <section id="dashboard"> 
            <Navigation />
                <div className="dashboard-headline">Najnowsze recenzje</div>
                    <div className={"carousel-cnt"}>
                    <Carousel className={"w-100"}>
                        {data.map((el, i) => (
                             <Carousel.Item key={i}>
                             <img
                             className="d-block w-100 fluid"
                             src={el.poster}
                             alt="First slide"
                             style={{
                                height: 500, 
                                objectFit: "cover",
                                filter: "sepia(100%)",
                                objectPosition: "top"
                            }}
                             />
                             <Carousel.Caption className={"w-100 h-40"}
                             style={{
                                 left:0,
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 flexDirection: "column",
                                 background: "rgba(0,0,0,0.8)"
                             }}>
                             <h4>{el.title}</h4>
                             <h5>{el.movieTitle}</h5>
                             <Rating 
                                name="half-rating"
                                value={Number(el.score)}
                                precision={0.5} 
                                readOnly
                            />
                            <p>Autor: {el.author}</p>
                            <Link className={"link"} to={{
                                pathname: '/review',
                                state: { review: el }
                            }}>Czytaj więcej</Link>
                             </Carousel.Caption>
                         </Carousel.Item>
                        ))}
                    </Carousel>
                    </div>
        </section>
    ) : (
        <Redirect to="/login" />
    )
    return pending ? <Loader /> : content;
}
export default Dashboard;