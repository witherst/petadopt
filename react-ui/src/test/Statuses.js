import React, { useEffect, useState } from 'react';

function Statuses() {
    const [statuses, setStatuses] = useState(false)
    const [queryRes, setQueryRes] = useState(false)
    
    useEffect(() => {
        getStatuses();
    }, []);

    const getStatuses = () => {
        fetch('/api/status')
            .then(res => res.json())
            .then((res) => {
                setStatuses(res)
            });
    }

    const getStatusesByPet = () => {
        let petId = prompt('Enter pet id');

        fetch('/api/status/' + petId)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setQueryRes(res)
            });
    }

    const createStatus = () => {
        let petId = prompt('Enter pet id:')
        let status = prompt('Enter status:');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                petId,
                status
            }),
        }

        fetch('/api/status/insert', requestOptions)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setQueryRes(res)
                getStatuses();
            });
    }
    
    return (
        <div>
            <h1>STATUSES</h1>
            <button onClick={getStatusesByPet}>Select status</button>
            <button onClick={createStatus}>Add status</button>
            <br />
            <h3>data from DB:</h3>
            {statuses ? statuses.map( res =>
                <div>pet {res.pet_id} status{res.status_id} {res.timestamp} {res.status}</div> ) :
                'there is no data available'
            }
            <h3>results from query: </h3>
            {queryRes ? queryRes.map( res =>
                <div>pet {res.pet_id} status{res.status_id} {res.timestamp} {res.status}</div> ) :
                'there is no data available'
            }
        </div>
    )
}

export default Statuses;