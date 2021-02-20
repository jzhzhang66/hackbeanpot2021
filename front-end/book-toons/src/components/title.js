import React from 'react';
import './title.css';

function Title(props) {
    return (
        <div className="title-wrapper">
            <h1 className="title">{props.text}</h1>
            <div className="underline" style={{width: props.width}}></div>
        </div>
    );
}

export default Title;