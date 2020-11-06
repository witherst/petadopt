import React from 'react';
import { Link } from 'react-router-dom';

const CreatorUtil = (props) => {
    return (
        <div>
            <div className='body-container'>
                <Link>Add a new status</Link>
                <Link>Edit public profile</Link>
                <Link>Archive/Delete profile</Link>
            </div>
        </div>
    )
}

export default CreatorUtil;