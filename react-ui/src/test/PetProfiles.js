import React, { useEffect, useState } from 'react';

function PetProfiles() {
    const [pets, setPets] = useState(false);
    const [queryRes, setQueryRes] = useState(false);

    // run when mounted
    useEffect(() => {
        getPets();
    }, []);
    
    const getPets = () => {
        fetch('/api/pet')
            .then(res => res.json())
            .then((res) => {
                setPets(res)
            });
    }

    const getProfilesById = () => {
        let id = prompt('Enter user id');

        fetch('/api/pet/user/' + id)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setQueryRes(res)
            });
    }

    const getPetInfo = () => {
        let internalPetId = prompt('Enter pet name');

        fetch('/api/pet/' + parseInt(internalPetId))
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setQueryRes(res)
            });
    }

    const getPetsByDate = () => {
        let date = prompt('Enter date (YYYY-MM-DD)');

        fetch('/api/pet/date/' + date)
            .then(res => res.json())
            .then((res) => {
                setQueryRes(res)
            });
    }

    return (
        <div>
            <h1>PET_PROFILES</h1>
            <button onClick={getProfilesById}>Select by user id</button>
            <button onClick={createPetProfile}>Add pet</button>
            <button onClick={getPetInfo}>Get pet</button>
            <button onClick={getPetsByDate}>by date</button>
            <br />
            <h3>data from DB:</h3>
            {pets ? 
                pets.map(pet =>
                    <div>
                        {pet.internal_pet_id} {pet.creator_id} {pet.external_pet_id} {pet.profile_status}
                    </div>) :
                'there is no data available'}
            
            <h3>result from query: </h3> 
            {queryRes ? queryRes.map(pet => <div>
                        {pet.internal_pet_id} {pet.creator_id} {pet.external_pet_id} {pet.profile_status}
                    </div> ) :
                'there is no data found'}
        </div>
    );
}

export default PetProfiles;