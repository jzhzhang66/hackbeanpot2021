import React from 'react';
import './bookresults.css';
import Header from '../components/header';
import Title from '../components/title';
import BookCard from '../components/bookcard';
import SearchBar from '../components/searchbar';

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
            id_selected: ""
        }     
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
                    <button>continue</button>
                </div>
                <SearchBar text={searchText}/>
                <div className="search-buttoncontainer">
                    <button>search</button>
                </div>
            </div>
        )
    }
}

export default BookResults;