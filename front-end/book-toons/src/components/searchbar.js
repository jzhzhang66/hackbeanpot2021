import React from 'react';
import './searchbar.css';

function SearchBar(props) {
    return (
        <div className="search-div">
            <h2 for="search-input">{props.text}</h2>
            <input className="search-input" id="search-input" type="text"/>
        </div>
    );
}

export default SearchBar