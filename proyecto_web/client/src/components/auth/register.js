import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/textfieldgroup';

import { registerUser } from "../../actions/authactions";

class Register extends Component {

    responseFacebook = response =>{
        console.log(response);
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        });
    };

    componetClicked = () => console.log("Clicked");

    constructor() {
        super();
        this.state = {
            name: '', email: '', password: '', password2: '', errors: {},
            isLoggedIn: false,
            userID: '',
            name: '',
            picture: ''
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
        //Login with Facebook
        let fbContent;
        if (this.state.isLoggedIn) {
            this.props.history.push("/dashboard");
        } else {
            fbContent = (<FacebookLogin
            appId="275945779853061"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}/>

            );
        }

        const { errors } = this.state;

        return (
            <div className="register">
                <div className="register__container">
                    <form onSubmit={this.onSubmit} className="form" noValidate>
                        <TextFieldGroup
                            placeholder="Ingrese su nombre" name="name" value={this.state.name}
                            onChange={this.onChange} autoComplete="name" error={errors.name}
                        />
                        <TextFieldGroup
                            type="email" placeholder="Ingrese su correo electronico" name="email" value={this.state.email}
                            onChange={this.onChange} autoComplete="email" error={errors.email}
                        />
                        <TextFieldGroup
                            type="password" placeholder="Ingrese su contraseña" name="password" value={this.state.password}
                            onChange={this.onChange} autoComplete="current-password" error={errors.password}
                        />
                        <TextFieldGroup
                            type="password" placeholder="Confirme su contraseña" name="password2" value={this.state.password2}
                            onChange={this.onChange} autoComplete="new-password" error={errors.password2}
                        />
                        <input type="submit" className="button button-submit"/>
                    </form>
                <div>{fbContent}</div>
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

