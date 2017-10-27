import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import modifyInfoPanelDisplay from '../../actions/infoPanelActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('infoPanel actions', () => {
  it('modify the infoPanel display (false <=> true)', () => {
    const store = mockStore({ topics: [] });
    store.dispatch(modifyInfoPanelDisplay());
    expect(store.getActions()[0].type).toEqual('MODIFY_INFO_PANEL_DISPLAY');
  });
});
