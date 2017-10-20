import topics from '../../reducers/topics';

import * as types from '../../actions/actionTypes';

const { describe, it, expect } = global;

describe('topics reducer', () => {
  const topicList = [
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
      days: [
        {
          date: '2014-06-06T00:00:00.000+0000',
          volume: 22,
        },
        {
          date: '2014-06-04T00:00:00.000+0000',
          volume: 43,
        },
        {
          date: '2014-06-09T00:00:00.000+0000',
          volume: 0,
        },
        {
          date: '2014-06-07T00:00:00.000+0000',
          volume: 12,
        },
        {
          date: '2014-06-08T00:00:00.000+0000',
          volume: 11,
        },
        {
          date: '2014-06-03T00:00:00.000+0000',
          volume: 39,
        },
        {
          date: '2014-06-05T00:00:00.000+0000',
          volume: 38,
        },
      ],
      pageType: {
        blog: 17,
        facebook: 56,
        forum: 22,
        general: 5,
        image: 0,
        news: 26,
        review: 1,
        twitter: 35,
        video: 3,
      },
      queries: [
        {
          id: 1751295897,
          name: 'Berghain',
          volume: 165,
        },
      ],
    },
    {
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
      days: [
        {
          date: '2014-06-06T00:00:00.000+0000',
          volume: 4,
        },
        {
          date: '2014-06-04T00:00:00.000+0000',
          volume: 10,
        },
        {
          date: '2014-06-09T00:00:00.000+0000',
          volume: 0,
        },
        {
          date: '2014-06-07T00:00:00.000+0000',
          volume: 11,
        },
        {
          date: '2014-06-08T00:00:00.000+0000',
          volume: 3,
        },
        {
          date: '2014-06-03T00:00:00.000+0000',
          volume: 12,
        },
        {
          date: '2014-06-05T00:00:00.000+0000',
          volume: 8,
        },
      ],
      pageType: {
        blog: 4,
        facebook: 13,
        forum: 8,
        general: 1,
        image: 0,
        news: 7,
        review: 1,
        twitter: 13,
        video: 1,
      },
      queries: [
        {
          id: 1751295897,
          name: 'Berghain',
          volume: 48,
        },
      ],
    }];

  it('should return the initial state', () => {
    expect(topics(
      {
        generalInfo: undefined,
        isFetching: undefined,
        errorMessage: undefined,
      },
      {},
    )).toEqual({
      generalInfo: [],
      isFetching: false,
      errorMessage: '',
    });
  });

  it('handles a fetching topics request', () => {
    expect(topics(
      {
        generalInfo: [],
        isFetching: false,
        errorMessage: '',
      },
      {
        type: types.FETCH_TOPICS_REQUEST,
      },
    )).toEqual({
      generalInfo: [],
      isFetching: true,
      errorMessage: '',
    });
  });

  it('handles a successful fetching topics request', () => {
    expect(topics(
      {
        generalInfo: [],
        isFetching: false,
        errorMessage: '',
      },
      {
        type: types.FETCH_TOPICS_SUCCESS,
        topics: topicList,
      },
    )).toEqual({
      generalInfo: [
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
        },
      ],
      isFetching: false,
      errorMessage: '',
    });
  });

  it('handles a failed fetching topics request', () => {
    expect(topics(
      {
        generalInfo: [],
        isFetching: false,
        errorMessage: '',
      },
      {
        type: types.FETCH_TOPICS_FAILURE,
        message: 'Error message',
      },
    )).toEqual({
      generalInfo: [],
      isFetching: false,
      errorMessage: 'Error message',
    });
  });
});
