import React, { useState, useRef, useEffect} from 'react'
import './styles/styles.css'

export function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav"> 
                {props.children}
            </ul>
        </nav>
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
            <a href="#" className="icon-button" onClick={() => setOpen(!open)} ref={wrapperRef}>
                {props.icon}
            </a>

            {open && props.children}

        </li>
    )
}


export function DropdownMenu() {

    function DropdownItem(props){
        return(
            <a href="#" className="menu-item">
                {props.children}
            </a>
        )
    }

    return (
        <div className="dropdown">
            <DropdownItem>Account Profile</DropdownItem>
            <DropdownItem>Logout</DropdownItem>
        </div>
    );
}
