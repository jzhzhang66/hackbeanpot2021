import React from 'react';
import './artists.css';
import Header from '../components/header';
import Title from '../components/title';
import {getSongs} from '../utils/api';
import { motion } from "framer-motion";

class Artists extends React.Component {

    constructor(props) {
        super(props)
        if (!this.props.history.location.state) {
            this.props.history.push('/hackbeanpot2021')
        }
        this.state = {
            tone: this.props.history.location.state.tone,
            artist1: "",
            artist2: "",
            artist3: "",
            isLoading: false
        }
    }

    handleContinue = () => {
        this.setState({
            isLoading: true
        })
        const artists = [this.state.artist1, this.state.artist2, this.state.artist3]
        const tone = this.state.tone
        getSongs(tone, artists)
            .then(response => {
                this.props.history.push({
                    pathname: '/hackbeanpot2021/playlist',
                    state: {
                        playlist: response
                    }
                })
            })
    }

    updateArtist = (artist, e) => {
        switch (artist) {
            case 1:
                this.setState({
                    artist1: e.target.value
                })
                break;
            case 2:
                this.setState({
                    artist2: e.target.value
                })
                break;
            case 3:
                this.setState({
                    artist3: e.target.value
                })
                break;
        }
        console.log(this.state)
    }


    render() {
        return (
            <div>
            {this.state.isLoading && <motion.h1 className="loading-text" animate={{y: [0, 20, 0]}} transition={{loop: Infinity, duration: 2}}>hang tight while we create the perfect playlist...</motion.h1>}
            {!this.state.isLoading &&
                <div>
                <Header />
                <Title text="tell us your top 3 artists" width={'580px'} />
                <input className="artist-search" type="text" onChange={(e) => this.updateArtist(1, e)}></input>
                <input className="artist-search" type="text" onChange={(e) => this.updateArtist(2, e)}></input>
                <input className="artist-search" type="text" onChange={(e) => this.updateArtist(3, e)}></input>
                <div className="artist-buttoncontainer">
                    <motion.button id="artist-continue" disabled={!(this.state.artist1 && this.state.artist2 && this.state.artist3)} 
                    onClick={this.handleContinue}
                    whileHover={{ scale: (this.state.artist1 && this.state.artist2 && this.state.artist3) ? 1.1 : 1 }}
                    whileTap={{ scale: (this.state.artist1 && this.state.artist2 && this.state.artist3) ? 0.8 : 1 }}
                    >continue</motion.button>
                </div>
                </div>
    }
            </div>
        );
    }
}

export default Artists;