import { combineReducers } from 'redux';

import {
  RELOAD_TOPICS_REQUEST,
  CLOUD_PROCESS_START,
  CLOUD_PROCESS_END,
  UPDATE_SELECTED_WORD_ID,
  UPDATE_INFO_BAR_PIE_CHART_PERCENTAGE,
} from '../actions/actionTypes';

/**
 * Stores the complete list of words used to render the cloud
 */
const wordList = (state = [], action) => {
  switch (action.type) {
    case CLOUD_PROCESS_END:
      return action.wordList;
    default:
      return state;
  }
};

/**
 * Tracks topics general information processing state
 */
const isProcessing = (state = false, action) => {
  switch (action.type) {
    case CLOUD_PROCESS_START:
      return true;
    case CLOUD_PROCESS_END:
      return false;
    default:
      return state;
  }
};

/**
 * Stores the ID of the selected word
 */
const selectedWordId = (state = '', action) => {
  switch (action.type) {
    case UPDATE_SELECTED_WORD_ID:
      return action.wordId;
    default:
      return state;
  }
};

/**
 * Tracks topics reload request state
 */
const isTopicsReloadRequested = (state = false, action) => {
  switch (action.type) {
    case RELOAD_TOPICS_REQUEST:
      return true;
    case CLOUD_PROCESS_END:
      return false;
    default:
      return state;
  }
};

const pieChartPercentage = (state = -1, action) => {
  switch (action.type) {
    case UPDATE_INFO_BAR_PIE_CHART_PERCENTAGE:
      return action.percentage;
    default:
      return state;
  }
};

const cloud = combineReducers({
  wordList,
  isProcessing,
  selectedWordId,
  isTopicsReloadRequested,
  pieChartPercentage,
});
export default cloud;

export const getWordList = state => state.wordList.slice();
export const getIsProcessing = state => state.isProcessing;
export const getSelectedWordId = state => state.selectedWordId;
export const getIsTopicsReloadRequested = state => state.isTopicsReloadRequested;
export const getPieChartPercentage = state => state.pieChartPercentage;
