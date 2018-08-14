import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CriticItem extends Component{
    render() {
        const { post, auth } = this.props;

        return (
            <div className="feed__item">
                <h4 className="feed__item--title">{post.title}<span className="feed__item--user">{post.nickname}</span></h4>
                <p className="feed__item--text">{post.text}</p>
                { auth.isAuthenticated ? <i className="fas fa-heart"/> : null }
            </div>
        );
    }
}

CriticItem.propTypes = {
    post: PropTypes.object,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(CriticItem);