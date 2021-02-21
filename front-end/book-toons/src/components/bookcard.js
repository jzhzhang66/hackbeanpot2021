import React from 'react';
import './bookcard.css';

class BookCard extends React.Component {
    
    render() {
        return (
            <button className={this.props.selected ? "card-button selected" : "card-button"} 
            onClick={() => this.props.updateSelected(this.props.book.id)}>
                    <div className="card-contents">
                    <p>{this.props.book.title}</p>
                    <p>{this.props.book.author}</p>
                    </div>
            </button>
        );
    }
}

export default BookCard;