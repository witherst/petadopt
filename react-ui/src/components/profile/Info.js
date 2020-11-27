import React, { useEffect } from 'react';
import check_mark_logo from '../../images/check-mark.png'
import './styles/info-styles.css'
import {ReactComponent as CheckIcon} from './icons/check.svg'

const Info = (props) => {
    const {
        petDispositions
    } = props;

    useEffect(() => {
    }, []);

    return (
        <div className="info-container">
            <h1>Info</h1>
            <div className="body-container">
                {petDispositions ? petDispositions.map((item) =>
                    <Disposition key={item.id} disposition={item.disposition} />) :
                    ''}
            </div>
        </div>
    )
}

const Disposition = (props) => {
    return (
        <div className='disposition-container'>
            {/* <svg viewBox="0 0 700 700"><CheckIcon/></svg>             */}
            <img src={check_mark_logo}/>
            <h3>{props.disposition}</h3>
        </div>
    )
}

export default Info;