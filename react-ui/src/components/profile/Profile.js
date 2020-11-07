import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import PetPlate from './PetPlate';
import Facts from './Facts';
import Info from './Info';
import Story from './Story';
import Feed from './Feed';
import CreatorUtil from './CreatorUtil';

import '../../App.css'

// route: /pet/:petId
const Profile = (props) => {
    const {
        user, // internal user id of current user viewing profile
    } = props;

    const params = useParams();
    const [userId, setUserId] = useState(false);
    const [petId, setPetId] = useState(false);
    const [petProfile, setPetProfile] = useState(false);
    const [petDispositions, setPetDispositions] = useState(false);
    const [petStatuses, setPetStatuses] = useState(false);

    useEffect(() => {
        initializeIds();
        if (petId) {
            getProfile();
            getDispositions();
            getStatuses();
        }
    }, [user, petId]); 

    const initializeIds = () => {
        setUserId(user.internal_user_id)
        setPetId(params.petId)
    }

    const getProfile = () => {
        fetch('/api/pet/' + petId)
            .then(res => res.json())
            .then((res) => {
                setPetProfile(res[0])
            });
    }

    const getDispositions = () => {
        fetch('/api/disposition/' + petId)
            .then(res => res.json())
            .then((res) => {
                setPetDispositions(res)
            })
    }
    
    const getStatuses = () => {
        fetch('/api/status/' + petId)
            .then(res => res.json())
            .then((res) => {
                setPetStatuses(res)
            })
    }

    return (
        <div>
            <h1>PetId {petId}</h1>
            <div><PetPlate petProfile={petProfile} userId={userId}/></div>
            <div><Facts petProfile={petProfile} /></div>
            <div><Info petDispositions={petDispositions}/></div>
            <div><Story story={petProfile.story}/></div>
            <div><Feed petStatuses={petStatuses}/></div>
            <div>{userId == petProfile.creator_id || user.is_admin ? <CreatorUtil /> : ''}</div>
        </div>
    )
}

export default Profile