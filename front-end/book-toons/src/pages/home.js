import React from 'react';
import Header from '../components/header';
import SearchBar from '../components/searchbar';
import './home.css';
import './main.css';
import { motion } from "framer-motion";
import {withRouter} from 'react-router';
import { getBooksByTitle } from '../utils/googlebooks'

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

    handleSubmit = () => {
        getBooksByTitle(this.state.userInput)
            .then(response => {
                this.props.history.push({
                    pathname: '/hackbeanpot2021/book-results',
                    state: {
                        books: response
                    }
                })
            })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Header />
                <div className="intro">
                    <h1>find the perfect soundtrack for your personal reading session.</h1>
                    <div className="rectangle"></div>
                </div>
                <SearchBar searchInput={this.state.userInput}
                    updateInput={this.updateInput} text="start by searching for the title of your book..." />
                <div className="homebutton-container">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={this.handleSubmit}
                    >search</motion.button>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);