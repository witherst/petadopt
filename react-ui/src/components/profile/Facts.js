import React from 'react';

import './styles/facts-styles.css'

const Facts = (props) => {
    const {
        petProfile
    } = props;

    return (
        <div className="facts-container">
            <h1>Facts</h1>
            <div className="facts-info-div">
                <div><h3>Breed</h3> {petProfile.breed}</div>
                <div><h3>Color</h3> {petProfile.color}</div>
                <div><h3>Age</h3> {petProfile.age_in_months ? petProfile.age_in_months / 12 + ' years old ' : ''}</div>
                <div><h3>Size</h3> {petProfile.size}</div>
                <div><h3>Weight</h3> {petProfile.weight ? petProfile.weight + ' lbs' : ''}</div>
                <div><h3>Sex</h3> {petProfile.sex}</div>
            </div>
        </div>
    )
}

export default Facts;