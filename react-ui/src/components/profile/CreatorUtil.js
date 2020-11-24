import React from 'react';
import { Link } from 'react-router-dom';
import './styles/creator-utils-styles.css'

const CreatorUtil = (props) => {
    return (
        <div className='creator-utils-container'>
            <Link>Add a new status</Link>
            <Link>Edit public profile</Link>
            <Link>Archive/Delete profile</Link>
        </div>
    )
}

export default CreatorUtil;