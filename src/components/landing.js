import React from 'react';


const Landing = ({Link}) => (
    <>
        <Link className="landing-btn" to="/login">Zaloguj się</Link>
        <div className={"landing-content"}>
            <h1>Lorem Ipsum</h1>
            <p>
                Lorem ipsum dolor sit amet, 
                consectetur adipisicing elit. Praesentium
                fugiat repudiandae atque soluta minus commodi
                dolore magni deserunt voluptatibus iusto. Ad, eum? 
                Quae velit ipsam porro fuga sequi id nesciunt.
            </p>
                <Link className={"landing-btn"} to="/register">Dołącz do nas</Link>
        </div>   
    </>
);

export default Landing;