import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

const PetPlate = (props) => {
    const {
        petProfile,
        userId,
    } = props;

    const [isFollowing, setFollowingState] = useState(false);

    useEffect(() => {
        getFollowingState();
    }, [userId, petProfile]); 

    const updateFollowingState = () => {
        if (!isFollowing) {  // update
            addPetmark();
        } else {
            removePetmark();
        }
        setFollowingState(!isFollowing)
    }

    const getFollowingState = () => {
        if (!userId) {
            setFollowingState(false);
            return;
        }
        fetch(`/api/petmark/state/?user_id=${encodeURIComponent(userId)}&pet_id=${encodeURIComponent(petProfile.internal_pet_id)}`)
            .then(res => res.json())
            .then((data) => {
                setFollowingState(data ? true : false);
            })
    }

    const addPetmark = () => {
        const petId = petProfile.internal_pet_id;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                petId,
            }),
        }
        fetch(`/api/petmark/state`, requestOptions)
            .then(res => res.json())
            .then((res) => {
            });
    }

    const removePetmark = () => {
        const petId = petProfile.internal_pet_id;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                petId
            }),
        }
        
        fetch(`/api/petmark/state`, requestOptions)
            .then(res => res.json())
            .then((res) => {
            });
    }

    return (
        <div>
            <div className='availability-container'>
                <p>dot color</p>
                <p>{ petProfile.availability }</p>
            </div>
            <div className='profile-pic-container'>
                imageplaceholderhere
                <p>view photos</p>
            </div>
            <div className='profile-badge-container'>
                <h1>{ petProfile.external_pet_id }</h1>
                <p>{ petProfile.location }</p>
                <p>{ petProfile.animal_type }</p>
                <p>{ petProfile.age_in_months ? petProfile.age_in_months / 12 + ' years old ' : '' }</p>
            </div>
            <div className='contact-container'>
                <Link onClick={updateFollowingState}>{isFollowing ? 'unfollow' : 'follow'}</Link>
                <Link to='/messages'>message</Link>
            </div>
        </div>
    )
}

export default PetPlate;