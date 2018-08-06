import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'

class Navbar extends Component {
    render () {
        const { location } = this.props;

        const navClass = (loc) => {
            if (loc.toString() === "/") {
                return "navbar navbar-landing"
            } else {
                return "navbar"
            }
        };


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

            <header className={navClass(location.pathname)} >
                <div className="navbar__nav">
                    <span className="navbar__nav--button-logo"/>
                    <NavSearch />
                </div>
                <ul className="navbar__list">
                    <NavLink direction="criticas"/>
                    <NavLink direction="login" />
                    <NavLink direction="register" />
                    <NavLink direction="profile" />
                </ul>
            </header>
        );
    }
}

Navbar.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(Navbar);