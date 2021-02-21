import React from 'react';
import './artists.css';
import Header from '../components/header';
import Title from '../components/title';

class Artists extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            artist1: "",
            artist2: "",
            artist3: ""
        }
    }

    updateArtist = (artist, e) => {
        switch(artist) {
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
            <>
            <Header/>
            <Title text="tell us your top 3 artists" width={'580px'}/>
            <input className="artist-search" type="text" onChange={(e) => this.updateArtist(1, e)}></input>
            <input className="artist-search" type="text" onChange={(e) => this.updateArtist(2, e)}></input>
            <input className="artist-search" type="text" onChange={(e) => this.updateArtist(3, e)}></input>
            <div className="artist-buttoncontainer">
                <button id="artist-continue">continue</button>
            </div>
            </>
        );
    }
}

export default Artists;