import React, { useEffect, useState } from 'react';
import * as Constants from '../../constants/animal_options'

const Facts = (props) => {
    const {
        animalType,
        breed, setBreed,
        color, setColor,
        age, setAge,
        size, setSize,
        weight, setWeight,
        sex, setSex
    } = props;

    // default cat options
    const [options, setOptions] = useState({
        size: Constants.sizes,
        type: Constants.breeds[animalType],
        breed: Constants.breeds[animalType],
        color: Constants.colors[animalType]
    })
    
    const [age_years, setAgeYears] = useState();
    const [age_months, setAgeMonths] = useState();

    useEffect(() => {
        getOptions();
    }, [animalType]);

    const getOptions = () => {
        switch (animalType) {
            case (Constants.types.cat):
            case (Constants.types.dog):
            case (Constants.types.other):
                options.type = Constants.types[animalType];
                options.breed = Constants.breeds[animalType];
                options.color = Constants.colors[animalType];
            default:
                setOptions(options)
                break;
        }
    }

    const changeAge = () => {
        var ageInMonths = age_years * 12 + age_months;
        setAge(ageInMonths === 0 ? null : ageInMonths);
    }

    return (
        <div>
            <h1>Facts</h1>
            <div className='body-container'>
                <div className='input-container'>
                    <label>Breed</label>
                    <select 
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                    >
                        { options.breed.map((option, index) => 
                            <option key={index}> {option} </option>
                        )}
                    </select>
                </div>
                <div className='input-container'>
                    <label>Color</label>
                    <select 
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    >
                        { options.color.map((option, index) => 
                            <option key={index}> {option} </option>
                        )}
                    </select>
                </div>
                <div className='input-container'>
                    <label>Sex</label>
                    <select 
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                    >
                        <option value=''></option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </select>
                </div>
                <div className='input-container'>
                    <label>Weight</label>
                    <input
                        type='text'
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    /> lbs
                </div>
                <div className='input-container'>
                    <label>Size</label>
                    <select 
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    >
                        { options.size.map((option, index) => 
                            <option key={index}> {option} </option>
                        )}
                    </select>
                </div>
                <div className='input-container'>
                    <label>Age</label>
                    <input
                        type='text'
                        value={age_years}
                        onChange={(e) => {
                            setAgeYears(e.target.value);
                            changeAge();
                        }}
                    /> years
                    <input
                        type='text'
                        value={age_months}
                        onChange={(e) => {
                            setAgeMonths(e.target.value)
                            changeAge();
                        }}
                    /> months
                </div>
            </div>
        </div>
    )
}

export default Facts;