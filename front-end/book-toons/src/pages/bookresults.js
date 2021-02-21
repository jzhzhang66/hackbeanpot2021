import React from 'react';
import './bookresults.css';
import Header from '../components/header';
import Title from '../components/title';
import BookCard from '../components/bookcard';
import SearchBar from '../components/searchbar';
import { motion } from "framer-motion";
import {getTones} from '../utils/api';

class BookResults extends React.Component {
    constructor(props) {
        super(props)
        if (!this.props.history.location.state) {
            this.props.history.push('/hackbeanpot2021')
        }
        this.state = {
            books: this.props.history.location.state.books,
            id_selected: "",
            userInput: ""
        }     
    }

    handleSelection = () => {
        getTones(this.state.books.find(b => b.id === this.state.id_selected).description)
            .then(response => {
                this.props.history.push({
                    pathname: '/hackbeanpot2021/artists',
                    state: {
                        tone: response
                    }
                })
            })
    }

    updateInput = (input) => {
        this.setState({
            userInput: input
        })
        console.log(this.state.userInput)
    }

    updateSelected = (id) => {
        this.setState({
            id_selected: id
        })
        console.log(id)
    }

    render() {
        //console.log(this.state.books)
        const searchText = "can't find what you're looking for? search again!"
        return (
            <div>
                <Header />
                <Title text="search results" width={'370px'} />
                {console.log(this.state.books)}
                <div className="all-bookcard-container">
                    {this.state.books.map(b => 
                    <BookCard book={b} 
                    updateSelected={this.updateSelected} 
                    selected={this.state.id_selected === b.id}/>)}
                </div>
                <div className="bookresult-buttoncontainer">
                <motion.button 
                    whileHover={{scale: this.state.id_selected? 1.1 : 1 }}
                    whileTap={{ scale: this.state.id_selected? 0.8 : 1}} 
                    onClick={this.handleSelection}
                    disabled={!this.state.id_selected}
                    >continue</motion.button>
                </div>
                <SearchBar text={searchText} updateInput={this.updateInput}/>
                <div className="search-buttoncontainer">
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }} >search</motion.button>
                </div>
            </div>
        )
    }
}

export default BookResults;