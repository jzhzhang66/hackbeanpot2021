import React from 'react';
import { Button } from 'react-bootstrap'
import './btn.css';

function Btn(props) {
    return (
        <div>
            <Button>{props.text}</Button>
        </div>
    );
}

export default Btn