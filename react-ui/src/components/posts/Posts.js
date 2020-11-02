import React from 'react';
import './styles/post-styles.css'
import Nameplate from '../nameplate/Nameplate'
import {ReactComponent as LikeIcon} from './icons/like.svg'
import {ReactComponent as ShareIcon} from './icons/share.svg'
import Kitten01 from "./images/kitten01.jpg"  // Temp images until we get from DB
import Kitten02 from "./images/kitten02.jpg"  // Temp images until we get from DB
import Pup01 from "./images/pup01.jpg"  // Temp images until we get from DB
import Pup02 from "./images/pup02.jpg"  // Temp images until we get from DB
import Pointy from "./images/pointy.jpg"  // Temp images until we get from DB

export function Posts(props) {
    const posts = []
    const images = []

    // TODO: Temp filling posts with nonsense text and placeholder image 
    //  This info should be user name for nameplate, and all post related garbage that comes from the database.
    posts.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut iaculis sagittis luctus.")
    posts.push("Leo sit amet congue. Oncus arcu. Nam neque mauris, scelerisque a turpis sed, luctus faucibus sapien. Cras id vulputate lorem.");
    posts.push("Consectetur adipiscing elit. Ut iaculis sagittis luctus.  quam ac, viverra augue. In sollicitudin velit sed lobortis dignissim. Sed egestas diam sed orci tristique, nec molestie neque aliquet. Quisque turpis ante, auctor ac velit vel, cursus rhoncus arcu. Nam neque mauris, scelerisque a turpis sed, luctus faucibus sapien. Cras id vulputate lorem.");
    posts.push("Elit. Ut iaculis sagittis luctus. Aliquam tempus, augue nec iaculis rhoncus, magna diam vulputate lorem, vitae tincidunt odio neque at augue. Nulla faucibus eu leo sit amet congue. Vestibulum quis tristique, nec molestie neque aliquet. Quisque turpis ante, auctor ac velit vel, cursus rhoncus arcu. Nam neque mauris, scelerisque a turpis sed, luctus faucibus sapien. Cras id vulputate lorem.");
    posts.push("Ipsum dolor sit amet, Ut iaculis sagittis luctus. , auctor ac velit vel, cursus rhoncus arcu. Nam neque mauris, scelerisque a turpis sed, luctus faucibus sapien. Cras id vulputate lorem.");
    posts.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut iaculis sagittis luctus. Aliquam tempus, augue nec iaculis rhoncus, magna diam vulputate lorem, vitae tincidunt odio neque at augue. Nulla faucibus eu leo sit amet congue. Vestibulum quis tempor mi, id sagittis tellus. Nulla elementum tortor ac efficitur commodo. Proin eget ex fringilla, tristique quam ac, viverra augue. In sollicitudin velit sed lobortis dignissim. Sed egestas diam sed orci tristique, nec molestie neque aliquet. Quisque turpis ante, auctor ac velit vel, cursus rhoncus arcu. Nam neque mauris, scelerisque a turpis sed, luctus faucibus sapien. Cras id vulputate lorem.");
    posts.push("Luctus. Aliquam tempus, augue nec iaculis rhonlus. Nulla elementum tortor ac efficitur commodo. Proin eget ex fringilla, tristique quam ac, viverra augue. In sollicitudin velit sed lobortis dignissim. Sed egestas diam sed orci tristique, nec molis, scelerisque a turpis sed, luctus faucibus sapien. Cras id vulputate lorem.");
    posts.push("Adipiscing elit. Ut iaculis sagittis luctus. Aliquam tempus, augue nec iaculis rhoncus, magna diam vulputate lorem, vitae tincidunt odio neque at augue. Nulla faucibus eu leo sit amet congue. Vestibulum quis tempor mi, id sagittis tellus. Nulla elementum tortor ac efficitur commodo. Proin eget ex fringilla, tristique quam ac, viverra augue. In sollicitudin velit sed lobortis dignissim. Sed egestas diam sed orci tristique, nec molestie neque aliquet. Quisque turpis ante, auctor ac velit vel, cursus rhoncus arcu. Nam neque mauris, scelerisque a turpis sed, luctus faucibus sapien. Cras id vulputate lorem.");
    posts.push("Ut iaculis sagittis luctus. Aliquam tempus, augue nec iaculis rhoncus, magna diam vulputate lorem, vitae tincidunt odio neque at augue.");
    posts.push("Proin eget ex fringilla, tristique quam ac, viverra augue. In sollicitudin velit sed lobortis dignissim. Sed egestas diam sed orci tristique, nec molestie neque aliquet. Quisque turpis ante, auctor ac velit vel, cursus rhoncus arcu. Nam neque mauris, scelerisque a turpis sed, luctus faucibus sapien. Cras id vulputate lorem.");

    for(let i = 0; i < 10; i++){
        images.push('');
    }

    images[0] = Kitten02;
    images[2] = Pup01;
    images[3] = Kitten01;
    images[6] = Pup02;
    images[9] = Pointy;

    return (
        <div className="posts-container">
            <div>
                { posts.map((person, index) => (
                    <Post key={index} data={person} img={images[index]}/>
                ))}
            </div>
        </div>
    )
}

function Post(props){
    console.log(props.img);
    return (
        <div className="individual-post">
            <div className="individual-post-nameplate-div">
                <Nameplate name="Tim Withers" subtext={"3 weeks ago"}/>
            </div>
            <div className="individual-post-status-container">
                <p>{props.data}</p>
                <img src={props.img}/>
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