import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar-container">
            <nav className="navbar">
                <h4>Notification task</h4>
                <div className="links">
                    <NavLink to="/">Main</NavLink>
                    <NavLink to="/settings">Settings</NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
