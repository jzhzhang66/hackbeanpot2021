import React from 'react';
import Header from '../components/header';
import SearchBar from '../components/searchbar';
import './home.css';
import './main.css';
import { motion } from "framer-motion";

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
                <SearchBar searchInput={this.state.userInput} 
                updateInput={this.updateInput} text="start by searching for the title of your book..."/>
                <div className="homebutton-container">
                    <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }} >search</motion.button>
                </div>
            </div>
        );
    }
}

export default Home;