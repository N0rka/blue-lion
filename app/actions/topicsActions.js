import * as types from './actionTypes';

export const fetchTopics = () => (dispatch) => {
    dispatch({
        type: types.FETCH_TOPICS_REQUEST
    });
    try {
        const fileContent = require('../../topics.json');
        dispatch({
            type: types.FETCH_TOPICS_SUCCESS,
            topics: fileContent.topics
        });
    } catch(error) {
        dispatch({
            type: types.FETCH_TOPICS_FAILURE,
            message: error.message
        });
    }
};
