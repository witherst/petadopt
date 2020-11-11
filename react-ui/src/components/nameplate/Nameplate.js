import React from 'react'
import './styles/nameplate-styles.css'

function Nameplate(props) {
    const {
        name, subtext, picLoc
    } = props;

    return (
        <div className="nameplate-container">
            <div className="img-container">
                <img src={picLoc}></img>
            </div> 
            <div className="nameplate-text-container">
                <h1>{name}</h1>
                <h2>{subtext}</h2>
            </div>
        </div>
    )
}

export default Nameplate;