import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render () {
        function NavLink(props){
            return (
                <li className="navbar__list--item">
                    <Link to={`/${props.direction}`} className="navbar__list--link">{props.direction}</Link>
                </li>
            );
        }

        function NavSearch () {
            return (
                <div className="navbar__nav--search">
                    <span className="navbar__nav--search-icon"/>
                    <input className="navbar__nav--search-bar" type="text" placeholder="Intenta con 'La Cabba'"/>
                </div>
            );
        }

        return (
            <header>
                <div className="navbar__nav">
                    <span className="navbar__nav--button-logo" />
                    <NavSearch />
                </div>
                <ul className="navbar__list">
                    <NavLink direction="criticas"/>
                    <NavLink direction="login" />
                    <NavLink direction="register" />
                </ul>
            </header>
        );
    }
}

export default Navbar;