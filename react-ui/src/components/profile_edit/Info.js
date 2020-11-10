import React, { useEffect, useState } from 'react';

import check_mark_logo from '../../images/check-mark.png'

const Info = (props) => {
    const {
        dispositions, setDispositions
    } = props;

    useEffect(() => {
        getOptions();
    }, );

    const [options, setOptions] = useState({})

    const getOptions = async function() {
        const promise = await fetch('/api/disposition');
        const res = await promise.json();
        res.forEach(item => {
            options[item.id] = item.disposition
        })

        setOptions(prevState => {
            return {...prevState}
        })
    }

    const handleAdd = (selection) => {
        if (selection > 0) {
            dispositions[selection] = options[selection]
            delete options[selection]
            setDispositions(prevState => {
                return {...prevState}
            })
        }
    }

    const handleRemove = (selection) => {
        options[selection] = dispositions[selection]
        delete dispositions[selection]
        setDispositions(prevState => {
            return {...prevState}
        })
    }

    return (
        <div>
            <h1>Info</h1>
            <div className='body-container'>
                <DropdownOptions 
                    options={options}
                    handleAdd={handleAdd}
                />
                <Selection
                    dispositions={dispositions}
                    handleRemove={handleRemove}
                />
            </div>
        </div>
    )
}

const DropdownOptions = (props) => {
    const {
        options,
        handleAdd
    } = props;

    useEffect(() => {
    }, []);

    const [currSelection, setCurrSelection] = useState(0);

    return (
        <div className='input-container'>
            <select 
                value={currSelection}
                onChange={(e) => setCurrSelection(e.target.value)}
            >
                <option
                    value={0}
                    onChange={(e) => setCurrSelection(e.target.value)}
                /> 
                {
                    Object.keys(options).map(key =>
                        <option
                            key={key}
                            value={key}
                            onChange={(e) => setCurrSelection(e.target.value)}
                        > {options[key]} </option>
                    )
                }
            </select>
            <input type='submit' value='Add' 
            onClick={() => {handleAdd(currSelection); setCurrSelection(0)}}/>
        </div>
    )
}

const Selection = (props) => {
    const {
        dispositions,
        handleRemove,
    } = props;

    return (
        <div className='selected-container'>
            <ul>{ 
                Object.keys(dispositions).map((key) =>
                    <li className='item-container' key={key}>
                        <img src={check_mark_logo}/>
                        <p>{dispositions[key]}</p>
                        <input
                            type='submit' value='-'
                            onClick={() => handleRemove(key)}
                        />
                    </li>
                )
            }</ul>
        </div>
    )
}

export default Info;