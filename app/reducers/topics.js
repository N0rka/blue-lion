import { combineReducers } from 'redux';

import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAILURE,
} from '../actions/actionTypes';

/**
 * Stores the complete list of topics general information
 */
const topicList = (state = [], action) => {
  switch (action.type) {
    case FETCH_TOPICS_SUCCESS:
      return action.topics.map(t => ({
        id: t.id,
        label: t.label,
        volume: t.volume,
        type: t.type,
        sentiment: t.sentiment,
        sentimentScore: t.sentimentScore,
        burst: t.burst,
        pageType: t.pageType,
      }));
    default:
      return state;
  }
};

/**
 * Tracks topics general information fetching state
 */
const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_TOPICS_REQUEST:
      return true;
    case FETCH_TOPICS_SUCCESS:
    case FETCH_TOPICS_FAILURE:
      return false;
    default:
      return state;
  }
};

/**
 * Tracks errors that occur during the fetching operation
 */
const errorMessage = (state = '', action) => {
  switch (action.type) {
    case FETCH_TOPICS_FAILURE:
      return action.message;
    case FETCH_TOPICS_REQUEST:
    case FETCH_TOPICS_SUCCESS:
      return '';
    default:
      return state;
  }
};

const topics = combineReducers({
  topicList,
  isFetching,
  errorMessage,
});
export default topics;

export const getTopicList = state => state.topicList.slice();
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
