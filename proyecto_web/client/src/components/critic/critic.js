import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CriticItem from '../critics/criticitem';
import CommentForm from './commentform';

import { getPost } from "../../actions/criticactions";

class Critic extends Component{
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }

    render(){
        let postContent;
        const { post, loading } = this.props.critic,
            {auth} = this.props;

        post === null || loading
            ? postContent = <h4>Loading...</h4>
            : postContent = [
                <CriticItem key={post._id} post={post} cssClass={"critic"} withActions={false}/>,
                <CommentForm postID={post._id}/>
            ];

        return(
            <div className="critic">
                <div className="critic__container">
                    <Link to={"/criticas"} className="button button-small">Volver atras</Link>
                    {postContent[0]}
                </div>
                { auth.isAuthenticated ? postContent[1] : null }
            </div>
        );
    }
}

Critic.propTypes = {
    getPost: PropTypes.func,
    critic: PropTypes.object,
    auth: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth,
    critic: state.critic
});

export default connect(mapStateToProps, { getPost }) (Critic);