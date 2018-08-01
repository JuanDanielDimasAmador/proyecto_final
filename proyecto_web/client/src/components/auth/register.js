import React, { Component } from 'react';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: ''
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }


    render () {

        const FormGroup = (props) => {
            return(
                <div className="register__form--group">
                    <input type={props.type}
                           className="register__form--input"
                           name={props.name}
                           placeholder={props.placeholder}
                           value={props.value}
                           onChange={this.onChange}
                    />
                    <span className="register__form--input-icon" />
                </div>
            );
        };

        return (
            <div className="register">
                <form action="" className="register__form">
                    <FormGroup type="text" name="nombre" placeholder="Inserte su nombre" value={this.state.name} />
                    <FormGroup type="email" name="email" placeholder="Inserte su corro electronico" value={this.state.email} />
                    <FormGroup type="text" name="password" placeholder="Ingrese una contraseña" value={this.state.password} />
                    <FormGroup type="text" name="password2" placeholder="Confirme su contraseña" value={this.state.password2}/>
                </form>
            </div>
        );
    }
}


export default Register;
