import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextAreaGroup from '../common/textareagroup';
import TextFieldGroup from '../common/textfieldgroup';

import { addPlace } from '../../actions/placeactions';




class PlaceForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '', type: '', address: '', registedBy: '',  errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onChange.bind(this);
    }

    componentDidMount() {
        if (!nextProps.auth.isAuthenticated) {
            this.props.history.push('/login');
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
            direction: this.state.direction,
            registedBy: user.id
        };

        this.setState({ name: '', type: '', address: '', registedBy: '' });
        this.props.add(newPlace);
    }

    onChange(e) {
        this.setState( { [e.target.name]: e.target.value, [e.target.type]: e.target.value, [e.target.address]: e.target.value, errors: {} } )
    }

    render () {
        const { text, errors } = this.state;
        return (
            <div className="comment-form">
                <div className="comment-form__container">
                    <span className="comment-form__container--close">
                        <i className="fas fa-times"/>
                    </span>
                    <form onSubmit={this.onSubmit} className="form" noValidate>
                        <TextFieldGroup
                            placeholder = "Ingrese un nombre"
                            name = "name"
                            value = {this.state.name}
                            onChange = {this.onChange}
                            autoComplete = "name"
                            error = {errors.name}
                        />

                        <Combobox
                            name = "type"
                            value = {this.state.type}
                            onChange = {this.onChange}
                            error = {errors.type}
                            placeholder = "Seleccione un tipo de establecimiento"
                            data={[
                                'Bar',
                                'Centro Nocturno'
                            ]}
                        />
                        <TextAreaGroup
                            placeholder = "Escribe una descripción..."
                            name="direction"
                            value={this.state.direction}
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

PlaceForm.PropTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object,
    addPlace: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {addPlace})(PlaceForm);
