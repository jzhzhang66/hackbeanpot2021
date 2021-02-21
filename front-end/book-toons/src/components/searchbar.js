import React from 'react';
import './searchbar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="search-div">
                <h2 for="search-input">{this.props.text}</h2>
                <input className="search-input" 
                id="search-input"
                type="text"
                onChange={(e) => this.props.updateInput(e.target.value)}
                value={this.props.searchInput}
                />

            </div>
        );
    }
}

export default SearchBar