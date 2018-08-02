import React, { Component } from 'react';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '', email: '', password: '', password2: '', errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log(newUser);
    }

    render () {
        return (
            <div className="register">
                <div className="register__container">
                    <form onSubmit={this.onSubmit} className="form">
                        <div className="form__group">
                            <input type="text"
                                   className="form__input"
                                   name="name"
                                   placeholder="Ingrese su nombre"
                                   value={this.state.name}
                                   onChange = {this.onChange}
                            />
                            <span className="form__input--icon" />
                        </div>
                        <div className="form__group">
                            <input type="email"
                                   className="form__input"
                                   name="email"
                                   placeholder="Ingrese su correo"
                                   value={this.state.email}
                                   onChange = {this.onChange}
                            />
                            <span className="form__input--icon" />
                        </div>
                        <div className="form__group">
                            <input type="text"
                                   className="form__input"
                                   name="password"
                                   placeholder="Ingrese su contraseña"
                                   value={this.state.password}
                                   onChange = {this.onChange}
                            />
                            <span className="form__input--icon" />
                        </div>
                        <div className="form__group">
                            <input type="text"
                                   className="form__input"
                                   name="password2"
                                   placeholder="Confirme su contraseña"
                                   value={this.state.password2}
                                   onChange = {this.onChange}
                            />
                            <span className="form__input--icon" />
                        </div>
                        <input type="submit" className="button button-submit"/>
                    </form>
                </div>
            </div>
        );
    }
}


export default Register;
