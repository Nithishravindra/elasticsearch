import React from 'react';
import '../style/app.css';

function Card(props) {
    return (
        <li className="card">
            <h2>Filename: {props.fileName}</h2>
            <h3>Title: {props.title}</h3>
            <p>{props.body}</p>
        </li>
    );
}

export default Card;
