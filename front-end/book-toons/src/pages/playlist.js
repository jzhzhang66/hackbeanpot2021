import React from 'react';
import './playlist.css';
import Header from '../components/header';
import Title from '../components/title';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

class Playlist extends React.Component {
    constructor(props) {
        super(props)
        if (!this.props.history.location.state) {
            this.props.history.push('/hackbeanpot2021')
        }
        this.state = {
            id_selected: "",
            userInput: "",
            isLoading: true,
            playlist: this.props.history.location.state.playlist
        }     
    }

    render() {
        {console.log(this.state.playlist)}
        return (
            <div>
            {this.state.isLoading &&
            <div>
            <Header/>
            <Title text="your playlist" width={'320px'}/>
            <div className="playlist-container">
                    {this.state.playlist.map(song => <a href={song.songUrl}>
                    <p className="song" song={song} 
                    updateSelected={this.updateSelected} 
                    selected={this.state.id_selected === song.id}>{song.title + ' -'} {song.artist + ' - '} </p>
                    </a>)}
                </div>
            <div className="playlist-buttoncontainer">
                <Link to="/hackbeanpot2021">
                <button>start over</button>
                </Link>
            </div>
            </div>}
            {!this.state.isLoading && <h1 className="loading-text">hang tight while we create the perfect playlist...</h1>}
            </div>
        );
    }
}

export default Playlist;