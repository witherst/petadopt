import React, { useEffect, useState } from 'react';

const Story = (props) => {
    const {
        story, setStory
    } = props;

    useEffect(() => {

    }, []);

    return (
        <div>
            <h1>Story</h1>
            <div className='body-container'>
                <input 
                    className='textbox-container' 
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    />
            </div> 
        </div>
    )
}

export default Story;