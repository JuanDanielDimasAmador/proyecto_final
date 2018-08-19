import React, {Component} from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import TextAreaGroup from '../common/textareagroup';
import TextFieldGroup from '../common/textfieldgroup';

import { addPlace } from '../../actions/placeactions';

class PlaceForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '', 
            type: '', 
            location: {direction: ''}, 
            description: '', 
            registedBy: '',  
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.auth.isAuthenticated) {
            this.props.history.push("/login");
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const { user } = this.props.auth;
        const newPlace = {
            name: this.state.name,
            type: this.state.type,
            description: this.state.description,
            location: {direction: this.state.direction},
            registedBy: user.id
        };
        this.props.addPlace(newPlace);
        this.setState({ name: '', 
                        type: '', 
                        description: '', 
                        location: { direction: '' }, 
                        registedBy: '' });
        
    }

    onChange(e) {
        this.setState( { [e.target.name]: e.target.value, errors: {} } );
    }

    render () {
        const { name, type, description, direction, errors } = this.state;
        return (
            <div className="post-critic">
                <div className="post-critic__container">
                    <span className="post-critic__container--close">
                        <i className="fas fa-times"/>
                    </span>
                    <form onSubmit={this.onSubmit} className="form" noValidate>
                        <TextFieldGroup
                            placeholder = "Ingrese un nombre"
                            name = "name"
                            value = {name}
                            onChange = {this.onChange}
                            autoComplete = "name"
                            error = {errors.name}
                        />

                        <TextFieldGroup
                            placeholder = "Ingrese un tipo"
                            name = "type"
                            value = {type}
                            onChange = {this.onChange}
                            autoComplete = "name"
                            error = {errors.name}
                        />

                        <TextAreaGroup
                            placeholder = "Describe el lugar..."
                            name="description"
                            value={description}
                            onChange={this.onChange}
                            error={errors.text}
                        />
 
                        <TextAreaGroup
                            placeholder = "¿Cuál es la dirección del lugar?"
                            name="direction"
                            value={direction}
                            onChange={this.onChange}
                            error={errors.text}
                        />
                        <input type="submit" className="button button-submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

PlaceForm.propTypes = {
    addPlace: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object  
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addPlace })(PlaceForm);
