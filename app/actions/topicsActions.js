import * as types from './actionTypes';

import { generateRandomTopics } from '../utils';

import jsonContent from '../../topics.json';

const fetchTopics = topicsType => (dispatch) => {
  let topicsLabels = [];
  let topics = [];

  dispatch({
    type: types.FETCH_TOPICS_REQUEST,
  });

  try {
    if (topicsType === 'random') {
      topicsLabels = jsonContent.randomLabels;
    } else {
      topicsLabels = jsonContent.defaultLabels;
    }
    topics = generateRandomTopics(topicsType, topicsLabels);
    dispatch({
      type: types.FETCH_TOPICS_SUCCESS,
      topics,
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_TOPICS_FAILURE,
      message: error.message,
    });
  }
};

export default fetchTopics;
