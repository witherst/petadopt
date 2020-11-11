import React from 'react'
import './styles/nameplate-styles.css'
import Baby from './images/baby.jpg'

function Nameplate(props) {
    const {
        name, subtext
    } = props;

    return (
        <div className="nameplate-container">
            <div className="img-container">
                <img src={Baby}></img>
            </div> 
            <div className="nameplate-text-container">
                <h1>{name}</h1>
                <h2>{subtext}</h2>
            </div>
        </div>
    )
}

export default Nameplate;