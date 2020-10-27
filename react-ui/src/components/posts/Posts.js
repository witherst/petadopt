import React from 'react';
import './styles/post-styles.css'

export function Posts() {
    const posts = []

    // Temp filling posts with nonsense

    for (let i = 0; i < 10; i++){
        posts.push('Text');
    }


    return (
        <div className="posts-container">
            <div>
                { posts.map((person, index) => (
                    <Post key={index} data={person}/>
                ))}
            </div>
        </div>
    )
}

function Post(props){
    return (
        <div className="individual-post">
            {props.data}
        </div>
    )
}