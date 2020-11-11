import React, { useEffect, useState } from 'react';
import { useHistory, Route } from 'react-router-dom';

import * as Constants from '../../constants/animal_options'

import PetPlate from './PetPlate';
import Facts from './Facts';
import Info from './Info';
import Story from './Story';

// route: /profile/create-new
const CreateNewProfile = (props) => {
    const {
        user
    } = props;

    const initialState = {
        animalType: Constants.types.cat,
        availability: Constants.availability_options.available
    }

    let history = useHistory();

    const [userId, setUserId] = useState('');

    const [petName, setPetName] = useState('');
    const [location, setLocation] = useState('');
    const [animalType, setAnimalType] = useState(initialState.animalType);
    const [availability, setAvailability] = useState('');
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [age, setAge] = useState();
    const [size, setSize] = useState('');
    const [weight, setWeight] = useState();
    const [sex, setSex] = useState('');
    const [story, setStory] = useState('');
    const [dispositions, setDispositions] = useState({});

    const [petNameError, setPetNameError] = useState('');

    useEffect(() => {
        initializeStates()
        if (!user) {
            return;
        }
        
        if (!user.is_creator && !user.is_admin) {
            console.log(user);
            history.push('/')
        };
    }, [user]);

    const initializeStates = () => {
        setUserId(() => user.internal_user_id);
    }

    const clearInputs = () => {
        setPetName('')
        setLocation('')
        setAnimalType(initialState.animalType)
        setAvailability(initialState.availability)
        setBreed('')
        setColor('')
        setAge('')
        setSize('')
        setWeight('')
        setSex('')
        setStory('')
        setDispositions({})
    }

    const clearErrors = () => {
        setPetNameError('')
    }

    const validPetName = async function() {
        // check empty
        if (petName === '') {
            setPetNameError('Please enter a name')
            return false;
        }

        // check db for matching existing petname for user
        console.log('userId: ' + userId)
        const promise = await fetch('/api/pet/verify/' + userId + '/' + petName);
        const existingData = await promise.json();

        if (existingData) {
            setPetNameError('This name already taken. Please enter another name.')
        }
        return (existingData ? false : true)
    }

    const createPetProfile = async function() {
        const creatorId = user.internal_user_id;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                creatorId,
                petName,
                location,
                animalType,
                availability,
                breed,
                color,
                age,
                size,
                weight,
                sex,
                story
            }),
        }
        console.log(requestOptions.body);
        const promise = await fetch('/api/pet/insert', requestOptions);
        return await promise.json();
    }

    const addPetDispositions = async function(petId) {
        if (Object.keys(dispositions).length === 0) return;
        var pet_selection = [];
        Object.keys(dispositions).forEach((key) => {
            pet_selection.push(`(${petId}, ${key})`)
                // '(' + petId + ') , (' + key +')')
        })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pet_selection
            }),
        }
        console.log(requestOptions.body)
        const promise = await fetch('/api/disposition/insert/list', requestOptions);
        return promise.json()
    }

    const renderProfile = (petId) => {
        clearErrors();
        clearInputs();
        history.push('/pet/' + petId)
    }

    const handleCreateProfile = async function() {
        clearErrors();
        
        // validate field errors
        const isValidName = validPetName();
        if (!isValidName) {
            return;
        };

        // create profile record
        const profile_res = await createPetProfile();
        const petId = profile_res.internal_pet_id;

        // add pet profile dispositions
        await addPetDispositions(petId);

        renderProfile(petId);
    }

    return (
        <div>
            <PetPlate
                petName={petName} setPetName={setPetName}
                petNameError={petNameError} setPetNameError={setPetNameError}
                location={location} setLocation={setLocation}
                animalType={animalType} setAnimalType={setAnimalType}
                availability={availability} setAvailability={setAvailability}
            />
            <Facts
                animalType={animalType}
                breed={breed} setBreed={setBreed}
                color={color} setColor={setColor}
                age={age} setAge={setAge}
                size={size} setSize={setSize}
                weight={weight} setWeight={setWeight}
                sex={sex} setSex={setSex}
            />
            <Info
                dispositions={dispositions} setDispositions={setDispositions}
            />
            <Story
                story={story} setStory={setStory}
            />
            <input 
                type='submit'
                value='Create Profile'
                onClick={handleCreateProfile}
                />
        </div>
    )
}

export default CreateNewProfile;