import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

const PetPlate = (props) => {
    const {
        petName, setPetName,
        location, setLocation,
        animalType, setAnimalType,
        availability, setAvailability,
    } = props;

    useEffect(() => {
    }, []); 

    return (
        <div>
            <div className='profile-pic-container'>
                imageplaceholderhere
                <p>upload photo</p>
            </div>

            <div className='availability-container'>
                <div className='input-container'>
                    <label>Availability</label>
                <select
                        required
                        value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    >
                    <option value='Adoptable'>Adoptable</option>
                    <option value='Pending'>Pending</option>
                    <option value='Not Adoptable'>Not Adoptable</option>
                    </select>
                </div>
            </div>
            <div className='profile-badge-container'>
                <div className='input-container'>
                    <label>Petname</label>
                    <input
                        type='text'
                        required
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        />
                </div>
                <div className='input-container'>
                    <label>Location</label>
                    <input
                        type='text'
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                            />
                </div>

                <div className='input-container'>
                    <label>Animal Type</label>
                    <select 
                        value={animalType}
                        onChange={(e) => setAnimalType(e.target.value)}
                    >
                        <option value='Cat'>Cat</option>
                        <option value='Dog'>Dog</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default PetPlate;