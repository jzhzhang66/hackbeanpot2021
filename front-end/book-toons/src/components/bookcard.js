import React from 'react';
import './bookcard.css';

function BookCard(props) {
    return (
        <div className="bookcard-container">
            <p>{props.title}</p>
            <p>{props.author}</p>
        </div>
    );
}

export default BookCard;