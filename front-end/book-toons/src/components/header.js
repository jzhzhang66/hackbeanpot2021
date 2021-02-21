import React from 'react';
import './header.css';
import booktoonslogo from '../assets/booktoons-logo.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="header-container">
            <Link to='/' >
            <img src={booktoonslogo} className="logo"/>
            </Link>
            <div className="name-container">
                <h3>book toons</h3>
            </div>
        </div>
    );
}

export default Header;