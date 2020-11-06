import React, { useEffect, useState } from 'react';

import check_mark_logo from '../../images/check-mark.png'

const Info = (props) => {
    const {
        dispositions,
        setDispositions
    } = props;

    useEffect(() => {
        getOptions();
        
    }, []);

    const [items, setItems] = useState({})
    const [currSelection, setCurrSelection] = useState(0);
    // const [deleteSelection, setDeleteSelection] = useState('')

    const getOptions = () => {
        fetch('/api/disposition')
            .then(res => res.json())
            .then((res) => {
                res.map(item => {
                    items[item.id] = item.disposition
                })
            })
    }

    const addDisposition = () => {
        console.log(dispositions)
        console.log('currSelection : ' + currSelection)
        if (currSelection > 0) {
            console.log('adding to items')
            dispositions[currSelection] = items[currSelection]

            delete items[currSelection]
            setCurrSelection(0);
        }
    }

    const deleteDisposition = (deleteSelection) => {
        console.log('deleteSelection : ' + deleteSelection)
        // defaultDispositions[currSelection] = selectedDispositions[currSelection]
        // selectedDispositions.delete(currSelection)
        // setDispositions(selectedDispositions);
    }

    return (
        <div>
            <h1>Info</h1>
            <div className='body-container'>
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
                            Object.keys(items).map(key =>
                                <option
                                    key={key}
                                    value={key}
                                    onChange={(e) => setCurrSelection(e.target.value)}
                                > {items[key]} </option>
                        )}
                    </select>
                    <input type='submit' value='Add' onClick={addDisposition}/>
                </div>
                <div className='selected-container'>
                    <SelectedDispositions
                        dispositions={dispositions}
                        deleteDisposition={deleteDisposition} />
                </div>
            </div>
        </div>
    )
}

const SelectedDispositions = (props) => {
    const {
        dispositions,
        deleteDisposition,
    } = props;

    console.log(dispositions)

    return (
        
        <div className='disposition-container'>
            <ul >
            { 
                    Object.keys(dispositions).map((key) =>
                        <div className='item-container' key={key}>
                            <div className='logo-container'>
                                <img src={check_mark_logo}/>
                            </div>
                            <p>{dispositions[key]}</p>
                            <input
                                type='submit'
                                value='Remove'
                                onClick={(e) => deleteDisposition(key)}
                            />
                        </div>
                )
            }
            </ul>
        </div>
    )
}

export default Info;