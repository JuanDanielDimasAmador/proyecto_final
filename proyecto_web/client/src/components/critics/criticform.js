import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextAreaGroup from '../common/textareagroup';
import TextFieldGroup from '../common/textfieldgroup';

import { addPost } from "../../actions/criticactions";

class CriticForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '', title:'', errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/login");
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
        const newPost = {
            title: this.state.title,
            text: this.state.text,
            user: user.id,
            nickname: user.nickname
        };
        this.props.addPost(newPost);
        this.setState({ text: '', title: '' });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value, errors: {} });
    }

    render () {
        const { text, title, errors } = this.state;
        return (
            <div className="post-critic">
                <div className="post-critic__container">
                    <form onSubmit={this.onSubmit} className="form" noValidate>
                        <TextFieldGroup
                            placeholder="Describa su experiencia" name="title" value={title}
                            onChange={this.onChange} error={errors.title}
                        />
                        <TextAreaGroup
                            placeholder = "Comparte tu experiencia"
                            name="text"
                            value={text}
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

CriticForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addPost })(CriticForm);