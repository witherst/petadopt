import React from 'react';

import IndividualPost from '../posts/IndividualPost'

const Feed = (props) => {
    const {
        petStatuses
    } = props;

    return (
        <div>
            <h1>Feed</h1>
            <div className='body-container'>
                {petStatuses ? petStatuses.map((post) => 
                    <IndividualPost key={post.status_id} post={post} />
                ) :
                    ''
                }
            </div>
        </div>
    )
}

export default Feed;