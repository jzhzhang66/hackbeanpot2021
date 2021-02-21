import React from 'react';
import './playlist.css';
import Header from '../components/header';
import Title from '../components/title';

class Playlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dummy: [
                {
                    song: 'julie',
                    artist: 'taylor swift'
                },
                {
                    song: 'megan',
                    artist: 'beyonce'
                },
                {
                    song: 'judy',
                    artist: 'demi lovato'
                },
                {
                    song: 'shine',
                    artist: 'nerd'
                }
            ], 
            id_selected: "",
            userInput: "",
            isLoading: true
        }     
    }

    render() {
        return (
            <div>
            {this.state.isLoading &&
            <div>
            <Header/>
            <Title text="your playlist" width={'320px'}/>
            <div className="playlist-container">
                    {this.state.dummy.map(song => 
                    <p className="song" song={song} 
                    updateSelected={this.updateSelected} 
                    selected={this.state.id_selected === song.id}>{song.song + ' -'} {song.artist}</p>)}
                </div>
            <div className="playlist-buttoncontainer">
                <button>start over</button>
            </div>
            </div>}
            {!this.state.isLoading && <h1 className="loading-text">hang tight while we create the perfect playlist...</h1>}
            </div>
        );
    }
}

export default Playlist;