import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deletePost, likePost } from "../../actions/criticactions";

class CriticItem extends Component{

    onDeleteClick(id){
        this.props.deletePost(id);
    }

    onLikeClick(id) {
        this.props.likePost(id);
    }

    findUserLike(likes) {
        const { auth } = this.props;
        return likes.filter(like => like.user === auth.user.id).length > 0;
    }

    render() {
        const { post, auth } = this.props;

        let LikeAction = () => {
            return (
                <span className={"icon__like"} onClick={this.onLikeClick.bind(this, post._id)}>
                    <i className={ this.findUserLike(post.likes) ? "fas fa-heart green" : "fas fa-heart"}/>
                    { post.likes.length > 0 ? post.likes.length : null }
                </span>
            )
        };

        let deleteButton = auth.user.id === post.user
            ? (
                <button className="delete" onClick={this.onDeleteClick.bind(this,post._id)}>
                    <i className="fas fa-times"/>
                </button>
            ) : null ;

        let FeedActions = () => {
            if (auth.isAuthenticated) {
                return(
                    <div className="feed__item--actions">
                        <LikeAction/>
                        <Link to={`/post/${post._id}`} className="button button-small">Comentarios</Link>
                        { deleteButton }
                    </div>
                )
            } else {
                return <p className="feed__item--feedback">Inicie sesion para poder interactuar</p>;
            }
        };

        return (
            <div className="feed__item">
                <h2 className="feed__item--title">{post.title}<span className="feed__item--user">{post.nickname}</span></h2>
                <p className="feed__item--text">{post.text}</p>
                <FeedActions/>
            </div>
        );
    }
}

CriticItem.propTypes = {
    post: PropTypes.object,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func,
    likePost: PropTypes.func
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, likePost })(CriticItem);