import React from 'react';
import SearchBar from '../components/searchbar';
import './home.css';
import './main.css';

function Home() {

    const searchText = "start by searching for the title of your book..."

    return (
        <div>
            <div className="intro">
                <h1>find the perfect soundtrack for your personal reading session.</h1>
            </div>
            <SearchBar text={searchText}/>
        </div>
    );
}

export default Home;