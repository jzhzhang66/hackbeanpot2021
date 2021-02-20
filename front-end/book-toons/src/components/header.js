import React from 'react';
import './header.css';
import booktoonslogo from '../assets/booktoons-logo.png'

function Header() {
    return (
        <div className="header-container">
            <img src={booktoonslogo} className="logo"/>
            <div className="name-container">
                <h1>book toons</h1>
            </div>
        </div>
    );
}

export default Header;