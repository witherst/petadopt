import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PetPlate from './PetPlate';
import Facts from './Facts';
import Info from './Info';

// route: /pet/create-new/:targetUserId
const CreateNewProfile = (props) => {
    const {
        user
    } = props;

    const [petName, setPetName] = useState('');
    const [location, setLocation] = useState('');
    const [animalType, setAnimalType] = useState('Cat');
    const [availability, setAvailability] = useState('Adoptable');
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [age, setAge] = useState('');
    const [size, setSize] = useState('');
    const [weight, setWeight] = useState('');
    const [sex, setSex] = useState('');

    const [dispositions, setDispositions] = useState([]);

    useEffect(() => {
        
    }, [user]);

    return (
        <div>
            <PetPlate
                petName={petName} setPetName={setPetName}
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
        </div>
    )
}

export default CreateNewProfile;