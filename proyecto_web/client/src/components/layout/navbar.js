import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser} from "../../actions/authactions";

class Navbar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push("/");
    }

    render () {
        const { location } = this.props,
            { isAuthenticated } = this.props.auth;

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

        const NavLogout = () => {
            return (
                <li className="navbar__list--item">
                    <a
                        className="navbar__list--link"
                        href=""
                        onClick={this.onLogoutClick.bind(this)}
                    >Logout</a>
                </li>
            );
        };

        const NavGuest = () => {
                return [
                    <NavLink direction="login" />,
                    <NavLink direction="register" />
                ];
            },
            NavAuth = () => {
                return [
                    <NavLink direction="dashboard" />,
                    <NavLogout />
                ];
            };

        return (
            <header className={navClass(location.pathname)} >
                <div className="navbar__nav">
                    <span className="navbar__nav--button-logo"/>
                    <NavSearch />
                </div>
                <ul className="navbar__list">
                    <NavLink direction="criticas"/>
                    { isAuthenticated ? <NavAuth/> : <NavGuest/> }
                </ul>
            </header>
        );
    }
}

Navbar.propTypes = {
    location: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps,{logoutUser})(withRouter(Navbar));