import React from 'react';

const Facts = (props) => {
    const {
        petProfile
    } = props;

    return (
        <div>
            <h1>Facts</h1>
            <div className='body-container'>
                <b>Breed</b> {petProfile.breed} <br />
                <b>Color</b> {petProfile.color} <br />
                <b>Age</b> {petProfile.age_in_months ? petProfile.age_in_months / 12 + ' years old ' : ''} <br />
                <b>Size</b> {petProfile.size} <br />
                <b>Weight</b> {petProfile.weight ? petProfile.weight + ' lbs' : ''} <br />
                <b>Sex</b> {petProfile.sex} <br />
            </div>
        </div>
    )
}

export default Facts;