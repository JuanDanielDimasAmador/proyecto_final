import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/textfieldgroup';
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

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
       this.props.loginUser(userData);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="login" data-toggle="modal" data-target="#myModal">
                <div className="login__container">
                    <form onSubmit={this.onSubmit} className="form" noValidate>
                        <TextFieldGroup
                            type="email" class=".placeholder" placeholder="Ingrese su correo electronico" name="email" value={this.state.email}
                            onChange={this.onChange} autoComplete="email" error={errors.email}
                        />
                        <TextFieldGroup
                            type="password" placeholder="Ingrese su contraseña" name="password" value={this.state.password}
                            onChange={this.onChange} autoComplete="current-password" error={errors.password}
                        />
                        <input type="submit" className="button button-submit"/>
                        <span class="psw">No tienes cuenta? <a href="register">Registrate</a></span>
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

export default connect(mapStateToProps, { loginUser} )(Login);