import React from 'react';
import './artists.css';
import Header from '../components/header';
import Title from '../components/title';

class Artists extends React.Component {
    render() {
        return (
            <>
            <Header/>
            <Title text="tell us your top 3 artists" width={'580px'}/>
            <input className="artist-search" type="text"></input>
            <input className="artist-search" type="text"></input>
            <input className="artist-search" type="text"></input>
            <div className="artist-buttoncontainer">
                <button id="artist-continue">continue</button>
            </div>
            </>
        );
    }
}

export default Artists;