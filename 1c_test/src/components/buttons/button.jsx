import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './button.css'

function Btn(props){
    return (
        <Link to={`quiz/${props.id}`}><button className={props.btnClass}>{props.text}</button></Link>
    )
}

export default Btn