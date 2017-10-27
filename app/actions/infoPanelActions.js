import * as types from './actionTypes';

const modifyInfoPanelDisplay = () => (dispatch) => {
  dispatch({
    type: types.MODIFY_INFO_PANEL_DISPLAY,
  });
};

export default modifyInfoPanelDisplay;
