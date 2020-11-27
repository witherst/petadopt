import React, { useEffect, useState } from 'react';
import './styles/create-story-styles.css'

const Story = (props) => {
    const {
        story, setStory
    } = props;

    useEffect(() => {

    }, []);

    return (
        <div className="create-story-container">
            <h1>Story</h1>
            <div className='body-container'>
                <textarea 
                    className='textbox-container' 
                    value={story}
                    placeholder="Tell the story of the pet here..."
                    onChange={(e) => setStory(e.target.value)}/>
            </div> 
        </div>
    )
}

export default Story;