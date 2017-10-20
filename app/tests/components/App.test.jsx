import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import { App } from '../../components/App';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Fake topics.json
 * @type {Array}
 */
const appTestTopics = [
    {
        id: "1751295897__Berlin",
        label: "Berlin",
        volume: 165,
        type: "topic",
        sentiment: {
            negative: 3,
            neutral: 133,
            positive: 29,
        },
        sentimentScore: 65,
        burst: 13,
        days: [
            {
                date: "2014-06-06T00:00:00.000+0000",
                volume: 22,
            },
            {
                date: "2014-06-04T00:00:00.000+0000",
                volume: 43,
            },
            {
                date: "2014-06-09T00:00:00.000+0000",
                volume: 0,
            },
            {
                date: "2014-06-07T00:00:00.000+0000",
                volume: 12,
            },
            {
                date: "2014-06-08T00:00:00.000+0000",
                volume: 11,
            },
            {
                date: "2014-06-03T00:00:00.000+0000",
                volume: 39,
            },
            {
                date: "2014-06-05T00:00:00.000+0000",
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
                name: "Berghain",
                volume: 165,
            },
        ],
    }, {
        id: "1751295897__DJ",
        label: "DJ",
        volume: 48,
        type: "topic",
        sentiment: {
            neutral: 46,
            positive: 2,
        },
        sentimentScore: 54,
        burst: 29,
        days: [
            {
                date: "2014-06-06T00:00:00.000+0000",
                volume: 4,
            },
            {
                date: "2014-06-04T00:00:00.000+0000",
                volume: 10,
            },
            {
                date: "2014-06-09T00:00:00.000+0000",
                volume: 0,
            },
            {
                date: "2014-06-07T00:00:00.000+0000",
                volume: 11,
            },
            {
                date: "2014-06-08T00:00:00.000+0000",
                volume: 3,
            },
            {
                date: "2014-06-03T00:00:00.000+0000",
                volume: 12,
            },
            {
                date: "2014-06-05T00:00:00.000+0000",
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
                name: "Berghain",
                volume: 48,
            },
        ],
    }];

const getComponentWithErrorProps = (
    topicsGeneralInfo = [],
    isFetching = false,
    errorMessage = 'jest test - there is an error',
    fetchTopics = () => {},
    width = 400,
    height = 400,
    fontSizes = [12, 16, 22, 30, 40, 52],
) => (
  <App
    topicsGeneralInfo={topicsGeneralInfo}
    isFetching={isFetching}
    errorMessage={errorMessage}
    fetchTopics={fetchTopics}
    width={width}
    height={height}
    topics={appTestTopics}
    fontSizes={fontSizes}
  />
    );

const getComponentWithFetchingProps = (
    topicsGeneralInfo = [],
    isFetching = true,
    errorMessage = '',
    fetchTopics = () => {},
    width = 400,
    height = 400,
    fontSizes = [12, 16, 22, 30, 40, 52],
) => (
  <App
    topicsGeneralInfo={topicsGeneralInfo}
    isFetching={isFetching}
    errorMessage={errorMessage}
    fetchTopics={fetchTopics}
    width={width}
    height={height}
    topics={appTestTopics}
    fontSizes={fontSizes}
  />
    );

const getComponentWithEmptyTopicListProps = (
    topicsGeneralInfo = [],
    isFetching = false,
    errorMessage = '',
    fetchTopics = () => {},
    width = 400,
    height = 400,
    fontSizes = [12, 16, 22, 30, 40, 52],
) => (
  <App
    topicsGeneralInfo={topicsGeneralInfo}
    isFetching={isFetching}
    errorMessage={errorMessage}
    fetchTopics={fetchTopics}
    width={width}
    height={height}
    topics={appTestTopics}
    fontSizes={fontSizes}
  />
    );

describe('<App />', () => {
    it('renders error state', () => {
        const wrapper = shallow(getComponentWithErrorProps());
        expect(wrapper.contains(<p>jest test - there is an error</p>)).toEqual(true);
    });

    it('renders fetching state', () => {
        const wrapper = shallow(getComponentWithFetchingProps());
        expect(wrapper.contains(<span>Fetching topics..</span>)).toEqual(true);
    });

    it('renders empty topic list state', () => {
        const wrapper = shallow(getComponentWithEmptyTopicListProps());
        expect(wrapper.contains(<span>Empty topic list..</span>)).toEqual(true);
    });

    it('calls componentDidMount', () => {
        const spy = jest.spyOn(App.prototype, 'componentDidMount');
        shallow(getComponentWithEmptyTopicListProps());
        expect(spy).toHaveBeenCalled();
    });
});
