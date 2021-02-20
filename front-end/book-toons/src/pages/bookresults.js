import React from 'react';
import './bookresults.css';
import Header from '../components/header';
import Title from '../components/title';
import BookCard from '../components/bookcard';

function BookResults() {
    return (
        <div>
        <Header/>
        <Title width={'120px'}/>
        <BookCard/>
        </div>
    );
}

export default BookResults;