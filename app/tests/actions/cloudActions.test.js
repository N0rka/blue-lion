import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/cloudActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/**
 * Fake wordList stored after the d3 cloud processing
 * @type {Array}
 */
const words = [
  {
    id: '1751295897__Berlin',
    label: 'Berlin',
    volume: 165,
    type: 'topic',
    sentiment: {
      negative: 3,
      neutral: 133,
      positive: 29,
    },
    sentimentScore: 65,
    burst: 13,
    fontSize: 52,
    text: 'Berlin',
    font: 'serif',
    style: 'normal',
    weight: 'normal',
    rotate: 0,
    size: 52,
    padding: 10,
    x: 0,
    y: 0,
    width: 192,
    height: 104,
    xoff: 0,
    yoff: 0,
    x1: 96,
    y1: 51,
    x0: -96,
    y0: -52,
    hasText: true,
  }, {
    id: '1751295897__Paris',
    label: 'Paris',
    volume: 165,
    type: 'topic',
    sentiment: {
      negative: 3,
      neutral: 133,
      positive: 29,
    },
    sentimentScore: 65,
    burst: 13,
    fontSize: 52,
    text: 'Berlin',
    font: 'serif',
    style: 'normal',
    weight: 'normal',
    rotate: 0,
    size: 52,
    padding: 10,
    x: 0,
    y: 0,
    width: 192,
    height: 104,
    xoff: 0,
    yoff: 0,
    x1: 96,
    y1: 51,
    x0: -96,
    y0: -52,
    hasText: true,
  }];

describe('cloud actions', () => {
  it('should create an action to update cloud word list', () => {
    const store = mockStore({ wordList: [] });
    const expectedActions = [{
      type: types.CLOUD_PROCESS_END,
      wordList: words,
    }];
    store.dispatch(actions.updateWordList(words));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should update selected word id', () => {
    const store = mockStore({ selectedWordId: '' });
    const expectedActions = [{
      type: types.UPDATE_SELECTED_WORD_ID,
      wordId: 'fakeSelectedWordId',
    }];
    store.dispatch(actions.updateSelectedWordId('fakeSelectedWordId'));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should load the percentage of the selected piece of pieChart', () => {
    const store = mockStore({ percentage: -1 });
    const expectedActions = [{
      type: types.UPDATE_INFO_BAR_PIE_CHART_PERCENTAGE,
      percentage: 28,
    }];
    store.dispatch(actions.updateInfoBarPieChartPercentage(28));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
