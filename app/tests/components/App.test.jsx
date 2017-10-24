import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import { App } from '../../components/App';

Enzyme.configure({ adapter: new Adapter() });

const getComponentWithErrorProps = (
  fetchTopics = () => {},
  topicList = [],
  isFetching = false,
  errorMessage = 'Jest test - App component - there is an error.',
  onReloadTopicsRequest = () => {},
  isTopicsReloadRequested = false,
  width = 400,
  height = 400,
  fontSizes = [12, 16, 22, 30, 40, 52],
) => (
  <App
    fetchTopics={fetchTopics}
    topicList={topicList}
    isFetching={isFetching}
    errorMessage={errorMessage}
    onReloadTopicsRequest={onReloadTopicsRequest}
    isTopicsReloadRequested={isTopicsReloadRequested}
    width={width}
    height={height}
    fontSizes={fontSizes}
  />
);

const getComponentWithFetchingProps = (
  fetchTopics = () => {},
  topicList = [],
  isFetching = true,
  errorMessage = '',
  onReloadTopicsRequest = () => {},
  isTopicsReloadRequested = false,
  width = 400,
  height = 400,
  fontSizes = [12, 16, 22, 30, 40, 52],
) => (
  <App
    fetchTopics={fetchTopics}
    topicList={topicList}
    isFetching={isFetching}
    errorMessage={errorMessage}
    onReloadTopicsRequest={onReloadTopicsRequest}
    isTopicsReloadRequested={isTopicsReloadRequested}
    width={width}
    height={height}
    fontSizes={fontSizes}
  />
);

const getComponentWithEmptyTopicListProps = (
  fetchTopics = () => {},
  topicList = [],
  isFetching = false,
  errorMessage = '',
  onReloadTopicsRequest = () => {},
  isTopicsReloadRequested = false,
  width = 400,
  height = 400,
  fontSizes = [12, 16, 22, 30, 40, 52],
) => (
  <App
    fetchTopics={fetchTopics}
    topicList={topicList}
    isFetching={isFetching}
    errorMessage={errorMessage}
    onReloadTopicsRequest={onReloadTopicsRequest}
    isTopicsReloadRequested={isTopicsReloadRequested}
    width={width}
    height={height}
    fontSizes={fontSizes}
  />
);

describe('<App />', () => {
    it('renders error state', () => {
        const wrapper = shallow(getComponentWithErrorProps());
        expect(wrapper.contains(<p>Jest test - App component - there is an error.</p>)).toEqual(true);
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
