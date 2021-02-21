import React from 'react';
import './bookcard.css';
import { motion } from "framer-motion";

class BookCard extends React.Component {
    
    render() {
        return (
            <motion.button className={this.props.selected ? "card-button selected" : "card-button"} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => this.props.updateSelected(this.props.book.id)}>
                    <div className="card-contents">
                    <p>{this.props.book.title}</p>
                    <p>{this.props.book.authors}</p>
                    </div>
            </motion.button>
        );
    }
}

export default BookCard;

