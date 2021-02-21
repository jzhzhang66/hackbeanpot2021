import React from 'react';
import './bookresults.css';
import Header from '../components/header';
import Title from '../components/title';
import BookCard from '../components/bookcard';
import SearchBar from '../components/searchbar';
import { motion } from "framer-motion";

class BookResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dummy: [
                {
                    id: 123,
                    title: 'meggie',
                    author: 'judy'
                },
                {
                    id: 234,
                    title: 'julie',
                    author: 'carissa'
                },
                {
                    id: 345,
                    title: 'adrianna',
                    author: 'shine'
                },
                {
                    id: 456,
                    title: 'yerin',
                    author: 'laurel'
                }
            ], 
            id_selected: "",
            userInput: ""
        }     
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
        const searchText = "can't find what you're looking for? search again!"
        return (
            <div>
                <Header />
                <Title text="search results" width={'370px'} />
                <div className="all-bookcard-container">
                    {this.state.dummy.map(b => 
                    <BookCard book={b} 
                    updateSelected={this.updateSelected} 
                    selected={this.state.id_selected === b.id}/>)}
                </div>
                <div className="bookresult-buttoncontainer">
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }} >continue</motion.button>
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