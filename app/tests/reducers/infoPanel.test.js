import infoPanel from '../../reducers/infoPanel';

import * as types from '../../actions/actionTypes';

const { describe, it, expect } = global;

describe('infoPanel reducer', () => {
  it('should return the initial state', () => {
    expect(infoPanel(
      {
        isDisplayed: undefined,
      },
      {},
    )).toEqual({
      isDisplayed: false,
    });
  });

  it('opens its panel', () => {
    expect(infoPanel(
      {
        isDisplayed: false,
      },
      {
        type: types.MODIFY_INFO_PANEL_DISPLAY,
      },
    )).toEqual({
      isDisplayed: true,
    });
  });
  it('closes its panel', () => {
    expect(infoPanel(
      {
        isDisplayed: true,
      },
      {
        type: types.MODIFY_INFO_PANEL_DISPLAY,
      },
    )).toEqual({
      isDisplayed: false,
    });
  });
});
