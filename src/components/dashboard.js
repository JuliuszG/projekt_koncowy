import React, {useContext} from 'react';
import {AuthContext} from '../context/context';
import {Link, Redirect} from 'react-router-dom';

const Dashboard = () => {
    const {user, logOut} = useContext(AuthContext);
    const content = user ? (
        <section id="dashboard">            <button className="form-back-link" onClick={e => logOut(e)}>Wyloguj</button>
            <main>
            <div className="dashboard-welcome">Witaj {user.email} !</div>
               <div className="no-favs">
                <h2>Nie masz żadnych ulubionych filmów !</h2>
                <Link className="link" to="/search">Znajdź nowe filmy</Link>
               </div>
            </main>
        </section>
    ) : (
        <Redirect to="/login" />
    )
    return content;
}
export default Dashboard;