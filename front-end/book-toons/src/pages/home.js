import React from 'react';
import Header from '../components/header';
import SearchBar from '../components/searchbar';
import './home.css';
import './main.css';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userInput: ""
        }
    }

    updateInput = (input) => {
        this.setState({
            userInput: input
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="intro">
                    <h1>find the perfect soundtrack for your personal reading session.</h1>
                    <div className="rectangle"></div>
                </div>
                <SearchBar updateInput={this.updateInput} text="start by searching for the title of your book..."/>
                <div className="homebutton-container">
                    <button>search</button>
                </div>
            </div>
        );
    }
}

export default Home;