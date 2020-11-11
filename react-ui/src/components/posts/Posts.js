import React, { useState, useEffect} from 'react';

import './styles/post-styles.css'
import {ReactComponent as PostIcon} from './icons/post.svg'
import IndividualPost from './IndividualPost'

export function Posts(props) {
    const {
        user,
        userId,
        pets
    } = props;

    const [posts, setPosts] = useState(false);

    useEffect(() => {
        getPosts();
    }, [user, pets, posts]);

    const getPosts = () => {
        if (!user) {
          return;
        }
    
        if (user.is_admin) {
            fetch('/api/status')
                .then(res => res.json())
                .then((res) => {
                    setPosts(() => res)
                });
        } else if (user.is_creator) {
            fetch('/api/status/creator/' + userId)
                .then(res => res.json())
                .then((res) => {
                    setPosts(() => res)
                });
        } else {
            fetch('/api/petmark/statuses/' + userId)
                .then(res => res.json())
                .then((res) => {
                console.log(userId)
                    setPosts(() => res)
                });
        }
    }

    return (
        <div className="posts-container">
            {(user.is_creator || user.is_admin) && <PostInput pets={pets} setPosts={setPosts}/>}
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
        pets,
        setPosts
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
                setPosts(false);
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
