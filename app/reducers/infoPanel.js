import { combineReducers } from 'redux';

import {
  MODIFY_INFO_PANEL_DISPLAY,
} from '../actions/actionTypes';

/**
 * Tracks info panel display state
 */
const isDisplayed = (state = false, action) => {
  switch (action.type) {
    case MODIFY_INFO_PANEL_DISPLAY:
      return !state;
    default:
      return state;
  }
};

const infoPanel = combineReducers({
  isDisplayed,
});
export default infoPanel;

export const getIsDisplayed = state => state.isDisplayed;
