import React, { useState, useRef, useEffect} from 'react'
import {ReactComponent as PawIcon} from './icons/paw.svg'
import './styles/navbar-styles.css'

export function Navbar(props) {
    return (
        <div className="navbar-div">
            <div className="paw-div">
                <svg viewBox="0 0 278 278"><PawIcon/></svg>
                <h1>PetLinked</h1>
            </div>
            <input type="text" className="searchbar" placeholder="Find the right pet for you..."></input>
            <div className="navbar">
                <ul className="navbar-nav"> 
                    {props.children}
                </ul>
            </div>
        </div>
    )
}

export function NavItem(props){

    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);

        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setOpen(false);
        }
      };

    return(
        <li className="nav-item">
            <a href={props.route} className="icon-button" onClick={() => setOpen(!open)} ref={wrapperRef}>
                {props.icon}
            </a>
            <p>{props.name}</p>
            {open && props.children}
        </li>
    )
}


export function DropdownMenu() {

    function DropdownItem(props){
        return(
            <a href={props.route} className="menu-item">
                {props.children}
            </a>
        )
    }

    return (
        <div className="dropdown">
            <DropdownItem route='/profile'>Account Profile</DropdownItem>
            <DropdownItem route='#'>Logout</DropdownItem>
        </div>
    );
}
