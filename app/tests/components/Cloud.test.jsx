import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import { Cloud } from '../../components/App/Cloud';

Enzyme.configure({ adapter: new Adapter() });
const MockFn = jest.fn().mockImplementation(() => {});

const getComponentWithDefaultProps = (
    width = 400,
    height = 400,
    topics = [],
    fontSizes = [12, 16, 22, 30, 40, 52],
    isProcessing = false,
    wordList = [],
    selectedWordId = '',
    getWordCloudLabelPartialStyle = () => { },
    onSelectWord = () => { },
    onD3CloudProcessStart = () => { MockFn(); },
    onD3CloudProcessEnd = () => {},
    isTopicsReloadRequested = false,
) => (
  <Cloud
    width={width}
    height={height}
    topics={topics}
    fontSizes={fontSizes}
    isProcessing={isProcessing}
    wordList={wordList}
    selectedWordId={selectedWordId}
    getWordCloudLabelPartialStyle={getWordCloudLabelPartialStyle}
    onSelectWord={onSelectWord}
    onD3CloudProcessStart={onD3CloudProcessStart}
    onD3CloudProcessEnd={onD3CloudProcessEnd}
    isTopicsReloadRequested={isTopicsReloadRequested}
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
