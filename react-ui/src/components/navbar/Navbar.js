import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as PawIcon } from "./icons/paw.svg";
import "./styles/navbar-styles.css";

// Icons
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as SearchIcon } from "./icons/search.svg";
import { ReactComponent as MessageIcon } from "./icons/messages.svg";
import { ReactComponent as NotificationIcon } from "./icons/notification.svg";
import { ReactComponent as SettingsIcon } from "./icons/settings.svg";

export function Navbar(props) {
  return (
    <div className="navbar-div">
      <div className="paw-div">
        <a href="/">
          <svg viewBox="0 0 278 278">
            <PawIcon />
          </svg>
          <h1>PetLinked</h1>
        </a>
      </div>
      <input
        type="text"
        className="searchbar"
        placeholder="Find the right pet for you..."
      ></input>
      <div className="navbar">
        <ul className="navbar-nav">{props.children}</ul>
        {props.isSignedIn && (
          <NavItem icon={<HomeIcon />} route="/" name="home" />
        )}
        {props.isSignedIn && (
          <NavItem icon={<SearchIcon />} route="/browse" name="search" />
        )}
        {props.isSignedIn && (
          <NavItem icon={<MessageIcon />} route="/messages" name="messages" />
        )}
        {props.isSignedIn && (
          <NavItem
            icon={<NotificationIcon />}
            route="/notifications"
            name="notifications"
          />
        )}
        {props.isSignedIn && (
          <NavItem icon={<SettingsIcon />} route="#" name="settings">
            <DropdownMenu handleLogout={props.handleLogout} />
          </NavItem>
        )}
      </div>
    </div>
  );
}

export function NavItem(props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);

    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  return (
    <li className="nav-item">
      <a
        href={props.route}
        className="icon-button"
        onClick={() => setOpen(!open)}
        ref={wrapperRef}
      >
        {props.icon}
      </a>
      <p>{props.name}</p>
      {open && props.children}
    </li>
  );
}

export function DropdownMenu(props) {
  const { handleLogout } = props;
  function DropdownItem(props) {
    return (
      <a href={props.route} className="menu-item">
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown">
      <DropdownItem route="/settings">Account Settings</DropdownItem>
      <p onClick={handleLogout}>
        <DropdownItem route="/">Logout</DropdownItem>
      </p>
    </div>
  );
}
