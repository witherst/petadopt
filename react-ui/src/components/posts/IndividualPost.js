import React from 'react';
import moment from 'moment';

import './styles/post-styles.css'
import Nameplate from '../nameplate/Nameplate'
import {ReactComponent as LikeIcon} from './icons/like.svg'
import {ReactComponent as ShareIcon} from './icons/share.svg'

import Kitten01 from "./images/kitten01.jpg"  // Temp images until we get from DB

const IndividualPost = (props) => {
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

export default IndividualPost;