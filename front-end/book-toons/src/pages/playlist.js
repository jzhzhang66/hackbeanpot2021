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
            playlist: this.props.history.location.state.playlist
        }     
    }

    render() {
        {console.log(this.state.playlist)}
        return (
            
            <div>
            <Header/>
            <h1 className="playlist-intro">we have created a playlist for you based on the tone of your book and your favorite artists.</h1>
            <Title text="your playlist" width={'320px'}/>
            <div className="playlist-container">
                    {this.state.playlist.map(song => <a className="song-link" target="_blank" href={song.songUrl}>
                    <motion.p className="song" song={song} whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    updateSelected={this.updateSelected} 
                    selected={this.state.id_selected === song.id}>{song.title + ' -'} {song.artist[0]} </motion.p>
                    </a>)}
                </div>
            <div className="playlist-buttoncontainer">
                <Link to="/hackbeanpot2021">
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }} >start over</motion.button>
                </Link>
            </div>
            </div>
        );
    }
}

export default Playlist;