import React from 'react';

const Feed = (props) => {
    const {
        petStatuses
    } = props;

    return (
        <div>
            <h1>Feed</h1>
            <div className='body-container'>
                {petStatuses ? petStatuses.map((post) => 
                    <Post key={post.status_id} status={post.status} timestamp={post.timestamp} />
                ) :
                    ''
                }
            </div>
        </div>
    )
}

const Post = (props) => {
    return (
        <div className='post-container' key={props.status_id}>
            <img />
            <p><b>{props.status}</b></p>
            <p>{props.timestamp}</p>
        </div>
    )
}

export default Feed;