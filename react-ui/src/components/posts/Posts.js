import React, { useState, useEffect} from 'react';
import moment from 'moment';

import './styles/post-styles.css'
import Nameplate from '../nameplate/Nameplate'
import {ReactComponent as LikeIcon} from './icons/like.svg'
import {ReactComponent as ShareIcon} from './icons/share.svg'
import {ReactComponent as PostIcon} from './icons/post.svg'
import Kitten01 from "./images/kitten01.jpg"  // Temp images until we get from DB

export function Posts(props) {
    const {
        user,
        posts,
        pets
    } = props;

    useEffect(() => {
        
    }, [user, pets]);

    return (
        <div className="posts-container">
            {(user.is_creator || user.is_admin) && <PostInput pets={pets}/>}
            <div>
                { posts ? posts.map(post => 
                    <IndividualPost key={post.status_id} post={post} />
                ) : '' }
            </div>
        </div>
    )
}

function PostInput(props){
    const {
        pets
    } = props;

    const [selectedPet, setSelectedPet] = useState(false);
    const [status, setStatus] = useState('')

    const clearInputs = () => {
        setSelectedPet(() => false);
        setStatus(() => '');
    }

    const postStatus = () => {
        const petId = selectedPet;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                petId,
                status
            }),
        }

        if (!(selectedPet && status)) {
            return;
        }

        fetch('/api/status/insert', requestOptions)
            .then(res => res.json())
            .then(() => {
                clearInputs();
            })
    }

    return(
        <div className="post-input-container">
            <div className="post-as-container">
                <h1>Post as</h1>
                <form className="post-as-pet-name" action="#">
                    <select name="profilename" id="profilename" 
                        value={selectedPet}
                        onChange={(e) => setSelectedPet(e.target.value)}>
                        <option key={0} 
                            value={false} 
                            onChange={(e) => setSelectedPet(e.target.value)}
                            />
                        {pets && pets.map(pet =>(
                            <option 
                                key={pet.internal_pet_id} 
                                value={pet.internal_pet_id}
                                onChange={(e) => setSelectedPet(e.target.value)}
                                >{pet.external_pet_id}</option>
                        ))};
                    </select>
                </form>
            </div>
            <hr className="spacer"/>
            <form action="#">       {/* TODO: Fill in form action with the actual posting of a post (connect to server, add to DB, whatever) */}
                <textarea name="post-text" 
                    rows="5" 
                    cols="30" 
                    className="post-text" 
                    placeholder="Create status post here..."
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    />
            </form>
            <div className="post-button-container" onClick={postStatus}>
               <h1>Post</h1>
               <svg viewBox="0 0 500 500"><PostIcon/></svg>
           </div>
        </div>
    )
}

function IndividualPost(props){
    const {
        post
    } = props;

    const route = '/pet/' + post.internal_pet_id;
    return (
        <div className="individual-post">
            <a href={route}>
            <div className="individual-post-nameplate-div">
                <Nameplate 
                    name={post.external_pet_id} 
                    subtext={moment(post.timestamp).fromNow()}
                    picLoc={Kitten01}
                    />
            </div>
            </a>
            <div className="individual-post-status-container">
                <p>{post.status}</p>
            </div>
            <hr className="spacer"/>
            <div className="individual-post-likeshare-container">
                <div className="like-container">
                    <svg viewBox="0 0 278 278"><LikeIcon/></svg>
                    <h1>Like</h1>
                </div>
                <div className="share-container">
                    <svg viewBox="0 0 278 278"><ShareIcon/></svg>
                    <h1>Share</h1>
                </div>
            </div>
        </div>
    )
}