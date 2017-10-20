import * as types from './actionTypes';

export const notifyProcessStart = () => (dispatch) => {
  dispatch({
    type: types.CLOUD_PROCESS_START,
  });
};

export const notifyReloadTopicsRequest = () => (dispatch) => {
  dispatch({
    type: types.RELOAD_TOPICS_REQUEST,
  });
};

export const updateWordList = wordList => (dispatch) => {
  dispatch({
    type: types.CLOUD_PROCESS_END,
    wordList,
  });
};

export const updateSelectedWordId = wordId => (dispatch) => {
  dispatch({
    type: types.UPDATE_SELECTED_WORD_ID,
    wordId,
  });
};
