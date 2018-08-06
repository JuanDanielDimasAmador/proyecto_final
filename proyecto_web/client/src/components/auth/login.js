import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from "../../actions/authactions";

class Login extends Component {
    constructor () {
        super();
        this.state = {
            email: '', password: '', errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        console.log(user);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="login__container">
                    <form onSubmit={this.onSubmit} className="form" noValidate>
                        <div className="form__group">
                            <input type="email"
                                   autoComplete= "email"
                                   className={errors.email ? "form__input--invalid" : "form__input"}
                                   name="email"
                                   placeholder="Ingrese su correo"
                                   value={this.state.email}
                                   onChange = {this.onChange}
                            />
                            <span className="form__input--icon" />
                        </div>
                        { errors.email ? <div className="form__feedback--invalid">{ errors.email }</div> : null }
                        <div className="form__group">
                            <input type="text"
                                   className={errors.password ? "form__input--invalid" : "form__input"}
                                   name="password"
                                   placeholder="Ingrese su contraseña"
                                   value={this.state.password}
                                   onChange = {this.onChange}
                            />
                            <span className="form__input--icon" />
                        </div>
                        { errors.password ? <div className="form__feedback--invalid">{ errors.password }</div> : null }
                        <input type="submit" className="button button-submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(null, { loginUser} )(Login);