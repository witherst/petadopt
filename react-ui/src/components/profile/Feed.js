import React from 'react';
import IndividualPost from '../posts/IndividualPost'

import './styles/feed-styles.css'

const Feed = (props) => {
    const {
        petStatuses
    } = props;
    return (
        <div className="feed-container">
            <h1>Feed</h1>
            <div className="feed-body-container">
                {petStatuses ? petStatuses.map((post) => 
                    <IndividualPost key={post.status_id} post={post} external_pet_id={props.external_pet_id}/>
                ) : ''}
            </div>
        </div>
    )
}

export default Feed;