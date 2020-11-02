import React, { useEffect, useState } from 'react';

function Petmarks() {
    const [petmarks, setPetmarks] = useState(false)
    const [queryRes, setQueryRes] = useState(false)
    
    useEffect(() => {
        getPetmarks();
    }, []);

    const getPetmarks = () => {
        fetch('/api/petmark')
            .then(res => res.json())
            .then((res) => {
                setPetmarks(res)
            });
    }

    const getUserPetmarkStatuses = () => {
        let userId = prompt('Enter user id');

        fetch('/api/petmark/statuses/' + userId)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setQueryRes(res)
            });
    }

    const addPetmark = () => {
        let userId = prompt('Enter user id:')
        let petId = prompt('Enter pet id:');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                petId
            }),
        }
        
        fetch('/api/petmark/insert', requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setQueryRes(res)
                getPetmarks();
            });
    }

    return (
        <div>
            <h1>PETMARKS</h1>
            <button onClick={getUserPetmarkStatuses}>getUserPetmarkStatuses</button>
            <button onClick={addPetmark}>Add Petmark</button>
            <br />
            <h3>data from DB:</h3>
            {petmarks ? petmarks.map( res =>
                <div>user {res.user_id} - pet {res.pet_id} {res.external_pet_id} </div> ) :
                'there is no data available'
            }
            <h3>results from query: </h3>
            {queryRes ? queryRes.map( res =>
                <div>{JSON.stringify(res)} </div> ) :
                'there is no data available'
            }
        </div>
    )
}

export default Petmarks;