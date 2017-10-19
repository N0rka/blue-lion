import * as types from './actionTypes';

import { generateRandomTopics } from '../utils';

export const fetchTopics = (topicsType) => (dispatch) => {
    let topicsLabels = [];
    let topics = [];

    dispatch({
        type: types.FETCH_TOPICS_REQUEST
    });

    try {
        const jsonContent = require('../../topics.json');
        if(topicsType === 'random'){
            topicsLabels = jsonContent.randomLabels;
        } else {
            topicsLabels = jsonContent.defaultLabels;
        }
        topics = generateRandomTopics(topicsType, topicsLabels);
        dispatch({
            type: types.FETCH_TOPICS_SUCCESS,
            topics: topics
        });
    } catch(error) {
        dispatch({
            type: types.FETCH_TOPICS_FAILURE,
            message: error.message
        });
    }
};
