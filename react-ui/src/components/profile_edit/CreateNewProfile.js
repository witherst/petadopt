import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
        availability: Constants.availability_options.adoptable
    }

    let history = useHistory();

    const [userId, setUserId] = useState('');

    const [petName, setPetName] = useState('');
    const [location, setLocation] = useState('');
    const [animalType, setAnimalType] = useState(initialState.animalType);
    const [availability, setAvailability] = useState(initialState.availability);
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [age, setAge] = useState('');
    const [size, setSize] = useState('');
    const [weight, setWeight] = useState('');
    const [sex, setSex] = useState('');
    const [story, setStory] = useState('');
    const [dispositions, setDispositions] = useState({});

    const [petNameError, setPetNameError] = useState('');

    const [petId, setPetId] = useState('')

    useEffect(() => {
        setUserId(user.internal_user_id);
    }, [user]);

    const clearInputs = () => {
        setPetName('')
        setLocation('')
        setAnimalType('Cat')
        setAvailability('Adoptable')
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

        console.log(requestOptions)

        fetch('/api/pet/insert', requestOptions)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setPetId(res.internal_pet_id)
            });
    }

    const validPetName = async function() {
        // check empty
        if (petName === '') {
            setPetNameError('Please enter a name')
            return false;
        }

        // check db for matching existing petname for user
        const promise = await fetch('/api/pet/verify/' + userId + '/' + petName);
        const existingData = await promise.json();
        console.log('existinData: ' + existingData);
        return (existingData ? false : true)
    }

    const addPetDispositions = () => {

    }

    const handleCreateProfile = async function() {
        clearErrors();
        console.log('create clicked')
        
        // validate field errors
        const isValidName = await validPetName();
        if (!isValidName) {
            console.log('invalid, not proceeding to create profile')
            return;
        };

        // create profile record
        await createPetProfile();
        console.log('new petId: ' + petId);

        // record dispositions for profile

        // clear fields
        // clearInputs();
        // clearErrors();

        // redirect to created profile page

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