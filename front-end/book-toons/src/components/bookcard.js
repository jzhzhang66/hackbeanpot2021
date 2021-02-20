import React from 'react';
import { Button } from 'react-bootstrap';
import './bookcard.css';

class BookCard extends React.Component {
    
    render() {
        return (
            <button className={this.props.selected ? "card-button selected" : "card-button"} 
            onClick={() => this.props.updateSelected(this.props.book.id)}>
                    <p>{this.props.book.title}</p>
                    <p>{this.props.book.author}</p>
            </button>
        );
    }
}

export default BookCard;