import React from 'react';
import './title.css';

function Title(props) {
    return (
        <div className="title-wrapper">
            <h1 className="title">text</h1>
            <div className="rectangle" style={{width: props.width}}></div>
        </div>
    );
}

export default Title;