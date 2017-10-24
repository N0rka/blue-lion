import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import { Cloud } from '../../components/App/Cloud';

Enzyme.configure({ adapter: new Adapter() });
const MockFn = jest.fn().mockImplementation(() => {});

const getComponentWithDefaultProps = (
    width = 400,
    height = 400,
    fontSizes = [12, 16, 22, 30, 40, 52],
    topicList = [],
    isTopicsReloadRequested = false,
    cloudWordList = [],
    isProcessing = false,
    selectedWordId = '',
    onD3CloudProcessStart = () => { MockFn(); },
    onD3CloudProcessEnd = () => {},
    onSelectWord = () => {},
    getWordCloudLabelPartialStyle = () => {},
    pieChartPercentage = -1,
    onPathOver = () => {},
    onPathOut = () => {},
) => (
  <Cloud
    width={width}
    height={height}
    topicList={topicList}
    fontSizes={fontSizes}
    isProcessing={isProcessing}
    wordList={cloudWordList}
    selectedWordId={selectedWordId}
    getWordCloudLabelPartialStyle={getWordCloudLabelPartialStyle}
    onSelectWord={onSelectWord}
    onD3CloudProcessStart={onD3CloudProcessStart}
    onD3CloudProcessEnd={onD3CloudProcessEnd}
    isTopicsReloadRequested={isTopicsReloadRequested}
    pieChartPercentage={pieChartPercentage}
    onPathOver={onPathOver}
    onPathOut={onPathOut}
  />
    );

describe('<Cloud />', () => {
    it('calls componentDidMount', () => {
        const spy = jest.spyOn(Cloud.prototype, 'componentDidMount');
        shallow(getComponentWithDefaultProps());
        expect(spy).toHaveBeenCalled();
    });

    it('calls componentDidUpdate', () => {
        const spy = jest.spyOn(Cloud.prototype, 'componentDidUpdate');
        const wrapper = shallow(getComponentWithDefaultProps());
        wrapper.setProps({ isTopicsReloadRequested: true });
        expect(spy).toHaveBeenCalled();
    });
});
