import React from 'react';
import './searchbar.css';

function SearchBar(props) {
    return (
        <div className="search-div">
            <label for="search-input">{props.text}</label>
            <input className="search-input" id="search-input" type="text"/>
        </div>
    );
}

export default SearchBar