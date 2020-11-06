import React, { useEffect } from 'react';

const Info = (props) => {
    const {
        petDispositions
    } = props;

    useEffect(() => {
    }, []);

    return (
        <div>
            <h1>Info</h1>
            <div className='body-container'>
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
            <div className='icon-container'>icon</div>
            <p>{props.disposition}</p>
        </div>
    )
}

export default Info;