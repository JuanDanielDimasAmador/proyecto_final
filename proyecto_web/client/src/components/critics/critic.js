import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts } from '../../actions/criticactions';

import CriticForm from './criticform';
import CriticFeed from './criticfeed';

class Critic extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render () {
        let postContent;
        const { posts, loading } = this.props.critic,
            { auth } = this.props;

        posts === null || loading
            ? postContent = <h4>Loading...</h4>
            : postContent = <CriticFeed posts={posts}/>;

        return (
            <div className="feed">
                { auth.isAuthenticated ? <CriticForm/> : null }
                <div className="feed__container">
                    {postContent}
                </div>
            </div>
        );
    }
}

Critic.propTypes = {
    getPosts: PropTypes.func.isRequired,
    critic: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    critic: state.critic,
    auth: state.auth
});

export default connect(mapStateToProps, {getPosts}) (Critic);