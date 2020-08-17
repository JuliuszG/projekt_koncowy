import React from 'react';


const Landing = ({Link}) => (<section id={"landing"}>
    <button className="landing-login"><Link to="/login">Zaloguj się</Link></button>
    <div className={"landing-content"}>
        <h1>Lorem Ipsum</h1>
        <p>
            Lorem ipsum dolor sit amet, 
            consectetur adipisicing elit. Praesentium
             fugiat repudiandae atque soluta minus commodi
              dolore magni deserunt voluptatibus iusto. Ad, eum? 
              Quae velit ipsam porro fuga sequi id nesciunt.
        </p>
        <button className={"landing-btn"}><Link to="/register">Dołącz do nas</Link></button>
    </div>
    
    
    </section>
)

export default Landing;