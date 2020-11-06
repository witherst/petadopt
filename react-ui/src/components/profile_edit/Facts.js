import React, { useEffect, useState } from 'react';

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

    const dogBreeds = [
        '',
        'Australian Shepherd',
        'Beagle',
        'Bernese Mountain Dog',
        'Boston Terrier',
        'Boxer',
        'Bulldog',
        'Cocker Spaniel',
        'Corgi',
        'Dachshund',
        'Doberman Pinscher',
        'French bulldog',
        'German Shepherd',
        'German Shorthaired pointer',
        'Golden Retriever',
        'Great Dane',
        'Havanese',
        'Labrador Retriever',
        'Miniature Schnauzer',
        'Pomeranian',
        'Poodle',
        'Rottweiler',
        'Shetland Sheepdog',
        'Shih Tzu',
        'Siberian Husky',
        'Yorkshire Terrier',
        'Other/Unknown',
    ]
    
    const catBreeds = [
        '',
        'Abyssinian',
        'American Shorthair',
        'Bengal',
        'Birman',
        'Bombay',
        'British Shorthair',
        'Burmese',
        'Burmilla',
        'Chartreux',
        'Domestic Longhair',
        'Domestic Mediumhair',
        'Domestic Shorthair',
        'Himalayan',
        'Maine Coon',
        'Nebelung',
        'Norwegian Forest',
        'Persian',
        'Ragamuffin',
        'Ragdoll',
        'Russian Blue',
        'Scottish Fold',
        'Siamese',
        'Siberian',
        'Snowshoe',
        'Sphynx',
        'Tonkinese',
        'Turkish Angora',
        'Turkish Van',
        'Other/Unknown',
    ]

    const dogColors = [
        '',
        'Black',
        'Blue',
        'Brown/chocolate',
        'Cream',
        'Fawn',
        'Gold/yellow',
        'Grey',
        'Red',
        'White',
        'Other',
    ]

    const catColors = [
        '',
        'Bicolor',
        'Black',
        'Black & White',
        'Blue/grey',
        'Brown',
        'Calico/Tricolor',
        'Cinnamon',
        'Colour Point',
        'Cream',
        'Fawn',
        'Red/Ginger',
        'Sable',
        'Tabby',
        'Tortoiseshell',
        'White',
        'Other',
    ]

    const sizeOptions = [
        '',
        'Very thin',
        'Thin',
        'Ideal/Normal',
        'Slightly Overweight',
        'Overweight',
        'Obese',
        'Other',
    ]

    const [breedOptions, setBreedOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);

    const [age_years, setAgeYears] = useState();
    const [age_months, setAgeMonths] = useState();

    useEffect(() => {
        getOptions();
    }, [animalType]);

    const getOptions = () => {
        if (!animalType) {
            setBreedOptions([]);
            setColorOptions([]);
            return;
        }

        if (animalType == 'cat') {
            setBreedOptions(catBreeds);
            setColorOptions(catColors)
        } else {
            setBreedOptions(dogBreeds);
            setColorOptions(dogColors);
        }
    }

    const changeAge = () => {
        var ageInMonths = age_years * 12 + age_months;
        setAge(ageInMonths == 0 ? null : ageInMonths);
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
                        { breedOptions.map((option, index) => 
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
                        { colorOptions.map((option, index) => 
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
                        { sizeOptions.map((option, index) => 
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