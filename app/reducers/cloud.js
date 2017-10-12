import { combineReducers } from 'redux';

import {
    CLOUD_PROCESS_START,
    CLOUD_PROCESS_END,
    UPDATE_SELECTED_WORD_ID
} from '../actions/actionTypes'

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

const cloud = combineReducers({
    wordList,
    isProcessing,
    selectedWordId
});
export default cloud;

export const getWordList = (state) => state.wordList.slice();
export const getIsProcessing = (state) => state.isProcessing;
export const getSelectedWordId = (state) => state.selectedWordId;
