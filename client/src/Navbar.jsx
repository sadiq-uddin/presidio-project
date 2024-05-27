import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
    return (
        <nav>
            <ul>
                {!user && (
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                )}
                {!user && (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
                                    <li>
                    <Link to="/properties">Properties</Link>
                </li>

                {user && (
                    <>
                        <li>
                            <Link to="/add-property">Add Property</Link>
                        </li>
                        
                        <li>
                            <button onClick={onLogout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
