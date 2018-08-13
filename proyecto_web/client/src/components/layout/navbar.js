import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser} from "../../actions/authactions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
        this.props.history.push("/");
    }

    render () {
        const { isAuthenticated } = this.props.auth;

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
                return (
                    <ul className="navbar__list">
                        <NavLink direction="criticas"/>
                        <NavLink direction="login" />
                        <NavLink direction="register" />
                    </ul>

                );
            },
            NavAuth = () => {
                return (
                    <ul className="navbar__list">
                        <NavLink direction="criticas"/>
                        <NavLink direction="dashboard" />
                        <NavLogout />
                    </ul>

                );
            };

        return (
            <header className="navbar">
                <div className="navbar__nav">
                    <span className="navbar__nav--button-logo"/>
                    <NavSearch />
                </div>
                { isAuthenticated ? <NavAuth/> : <NavGuest/> }
            </header>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps,{logoutUser, clearCurrentProfile})(withRouter(Navbar));