import axios from 'axios';

import {ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING} from "./types";

export const addPost = postData => dispatch => {
    axios.post("api/critics", postData).then(res =>
        dispatch({
            type: ADD_POST,
            payload: res.data
        })).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const getPosts = () => dispatch => {
    dispatch(setLoadingState());
    axios
        .get("api/critics")
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_POSTS,
                payload: null
            });
        }
    );
};

export const setLoadingState = () => {
    return {
        type: POST_LOADING
    }
};