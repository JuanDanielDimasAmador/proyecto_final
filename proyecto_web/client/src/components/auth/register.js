import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from "../../actions/authactions";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '', email: '', password: '', password2: '', errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }


    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser,this.props.history);

    }

    render () {
        const { errors } = this.state;

        return (
            <div className="register">
                <div className="register__container">
                    <form onSubmit={this.onSubmit} className="form" noValidate>
                        <div className="form__group">
                            <input type="text"
                                   autoComplete="name"
                                   className={ errors.name ? "form__input--invalid" : "form__input"}
                                   name="name"
                                   placeholder="Ingrese su nombre"
                                   value={this.state.name}
                                   onChange = {this.onChange}
                            />
                            <span className="form__input--icon" />
                        </div>
                        { errors.name ? <div className="form__feedback--invalid">{ errors.name }</div> : null }
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
                            <input type="password"
                                   autoComplete="new-password"
                                   className={errors.password ? "form__input--invalid" : "form__input"}
                                   name="password"
                                   placeholder="Ingrese su contraseña"
                                   value={this.state.password}
                                   onChange = {this.onChange}
                            />
                            <span className="form__input--icon" />
                        </div>
                        { errors.password ? <div className="form__feedback--invalid">{ errors.password }</div> : null }
                        <div className="form__group">
                            <input type="password"
                                   autoComplete="new-password"
                                   className={errors.password2 ? "form__input--invalid" : "form__input"}
                                   name="password2"
                                   placeholder="Confirme su contraseña"
                                   value={this.state.password2}
                                   onChange = {this.onChange}
                            />
                            <span className="form__input--icon" />
                        </div>
                        { errors.password2 ? <div className="form__feedback--invalid">{ errors.password2 }</div> : null }
                        <input type="submit" className="button button-submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors : state.errors
});


export default connect(mapStateToProps, {registerUser})(withRouter(Register));

