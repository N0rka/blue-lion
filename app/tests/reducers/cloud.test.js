import cloud from '../../reducers/cloud';
import * as types from '../../actions/actionTypes';

describe('cloud reducer', () => {
  const wordList = [
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
      id: '1751295897__DJ',
      label: 'DJ',
      volume: 48,
      type: 'topic',
      sentiment: {
        neutral: 46,
        positive: 2,
      },
      sentimentScore: 54,
      burst: 29,
      fontSize: 16,
      text: 'DJ',
      font: 'serif',
      style: 'normal',
      weight: 'normal',
      rotate: 0,
      size: 16,
      padding: 10,
      width: 32,
      height: 32,
      xoff: 192,
      yoff: 0,
      x1: 16,
      y1: 15,
      x0: -16,
      y0: -16,
      hasText: true,
      x: 26,
      y: 27,
    }];

  it('should return the initial state', () => {
    expect(cloud(
      {
        wordList: undefined,
        isProcessing: undefined,
        selectedWordId: undefined,
        isTopicsReloadRequested: undefined,
        pieChartPercentage: undefined,
      },
      {},
    )).toEqual({
      wordList: [],
      isProcessing: false,
      selectedWordId: '',
      isTopicsReloadRequested: false,
      pieChartPercentage: -1,
    });
  });

  it('handles the beginning of the d3 cloud processing', () => {
    expect(cloud(
      {
        wordList: [],
        isProcessing: false,
        selectedWordId: '',
        isTopicsReloadRequested: false,
        pieChartPercentage: -1,
      },
      {
        type: types.CLOUD_PROCESS_START,
      },
    )).toEqual({
      wordList: [],
      isProcessing: true,
      selectedWordId: '',
      isTopicsReloadRequested: false,
      pieChartPercentage: -1,
    });
  });

  it('handles the end of the d3 cloud processing', () => {
    expect(cloud(
      {
        wordList: [],
        isProcessing: true,
        selectedWordId: '',
        isTopicsReloadRequested: false,
        pieChartPercentage: -1,
      },
      {
        type: types.CLOUD_PROCESS_END,
        wordList,
      },
    )).toEqual({
      wordList,
      isProcessing: false,
      selectedWordId: '',
      isTopicsReloadRequested: false,
      pieChartPercentage: -1,
    });
  });

  it('handles the update of the selected word id', () => {
    expect(cloud(
      {
        wordList,
        isProcessing: false,
        selectedWordId: '',
        isTopicsReloadRequested: false,
        pieChartPercentage: -1,
      },
      {
        type: types.UPDATE_SELECTED_WORD_ID,
        wordId: '1751295897__Berlin',
      },
    )).toEqual({
      wordList,
      isProcessing: false,
      selectedWordId: '1751295897__Berlin',
      isTopicsReloadRequested: false,
      pieChartPercentage: -1,
    });
  });

  it('handles the reload request of the topic list', () => {
    expect(cloud(
      {
        wordList,
        isProcessing: false,
        selectedWordId: '',
        isTopicsReloadRequested: false,
        pieChartPercentage: -1,
      },
      {
        type: types.RELOAD_TOPICS_REQUEST,
      },
    )).toEqual({
      wordList,
      isProcessing: false,
      selectedWordId: '',
      isTopicsReloadRequested: true,
      pieChartPercentage: -1,
    });
  });

  it('handles the reload success of the topic list', () => {
    expect(cloud(
      {
        wordList,
        isProcessing: true,
        selectedWordId: '',
        isTopicsReloadRequested: true,
        pieChartPercentage: -1,
      },
      {
        type: types.CLOUD_PROCESS_END,
        wordList: wordList.slice().concat(wordList.slice()),
      },
    )).toEqual({
      wordList: wordList.slice().concat(wordList.slice()),
      isProcessing: false,
      selectedWordId: '',
      isTopicsReloadRequested: false,
      pieChartPercentage: -1,
    });
  });

  it('handles the update of the percentage stored when a pie chart pie is hovered', () => {
    expect(cloud(
      {
        wordList,
        isProcessing: false,
        selectedWordId: '',
        isTopicsReloadRequested: false,
        pieChartPercentage: -1,
      },
      {
        type: types.UPDATE_INFO_BAR_PIE_CHART_PERCENTAGE,
        percentage: 32,
      },
    )).toEqual({
      wordList,
      isProcessing: false,
      selectedWordId: '',
      isTopicsReloadRequested: false,
      pieChartPercentage: 32,
    });
  });
});
