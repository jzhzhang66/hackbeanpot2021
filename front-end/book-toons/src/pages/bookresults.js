import React from 'react';
import './bookresults.css';
import Header from '../components/header';
import Title from '../components/title';
import BookCard from '../components/bookcard';

function BookResults() {
    const dummy = [
    {
        title: 'meggie',
        author: 'judy'
    },
    {
        title: 'julie',
        author: 'carissa'
    },
    {
        title: 'adrianna',
        author: 'shine'
    },
    {
        title: 'yerin',
        author: 'laurel'
    }
]
    return (
        <div>
        <Header/>
        <Title text="search results" width={'370px'}/>
        <div className="all-bookcard-container">
            {dummy.map(d => <BookCard title={d.title} author={d.author}/>)}
        </div>
        </div>
    );
}

export default BookResults;