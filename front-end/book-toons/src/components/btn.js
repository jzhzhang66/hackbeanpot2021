import React from 'react';
import './btn.css';

function Btn(props) {
    return (
        <div>
            <input type="button">{props.text}/</input>
        </div>
    );
}

export default Btn;