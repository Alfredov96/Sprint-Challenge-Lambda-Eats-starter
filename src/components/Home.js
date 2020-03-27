import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to Lambda Eats</h1>
            <p>to start your order click button below</p>
            <br/>
            <Link className="formButton" to={"/pizza"}>
                <div className="order-here">Get Orderin</div>
            </Link>
        </div>
    )
}

export default Home;