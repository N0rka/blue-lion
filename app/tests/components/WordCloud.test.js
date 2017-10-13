import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import WordCloud from '../../components/App/Cloud/WordCloud';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Fake wordList stored after the d3 cloud processing
 * @type {Array}
 */
const words = [
    {
        "id":"1751295897__Berlin",
        "label":"Berlin",
        "volume":165,
        "type": "topic",
        "sentiment":{
            "negative":3,
            "neutral":133,
            "positive":29
        },
        "sentimentScore":65,
        "burst": 13,
        "fontSize":52,
        "text":"Berlin",
        "font":"serif",
        "style":"normal",
        "weight":"normal",
        "rotate":0,
        "size":52,
        "padding":10,
        "x":0,
        "y":0,
        "width":192,
        "height":104,
        "xoff":0,
        "yoff":0,
        "x1":96,
        "y1":51,
        "x0":-96,
        "y0":-52,
        "hasText":true
    },{
        "id":"1751295897__Paris",
        "label":"Paris",
        "volume":165,
        "type": "topic",
        "sentiment":{
            "negative":3,
            "neutral":133,
            "positive":29
        },
        "sentimentScore":65,
        "burst": 13,
        "fontSize":52,
        "text":"Berlin",
        "font":"serif",
        "style":"normal",
        "weight":"normal",
        "rotate":0,
        "size":52,
        "padding":10,
        "x":0,
        "y":0,
        "width":192,
        "height":104,
        "xoff":0,
        "yoff":0,
        "x1":96,
        "y1":51,
        "x0":-96,
        "y0":-52,
        "hasText":true
    }];

const getComponentWithDefaultProps = (
    width = 400,
    height = 400,
    isProcessing = false,
    wordList = [],
    getWordCloudLabelPartialStyle = () => {},
    onSelectWord = () => {},
    selectedWordId = ''
) => {
    return (
        <WordCloud
            width={width}
            height={height}
            isProcessing={isProcessing}
            wordList={wordList}
            getWordCloudLabelPartialStyle={getWordCloudLabelPartialStyle}
            onSelectWord={onSelectWord}
            selectedWordId={selectedWordId}
        />
    );
};

const getComponentWithProcessingProps = (
    width = 400,
    height = 400,
    isProcessing = true,
    wordList = [],
    getWordCloudLabelPartialStyle = () => {},
    onSelectWord = () => {},
    selectedWordId = ''
) => {
    return (
        <WordCloud
            width={width}
            height={height}
            isProcessing={isProcessing}
            wordList={wordList}
            getWordCloudLabelPartialStyle={getWordCloudLabelPartialStyle}
            onSelectWord={onSelectWord}
            selectedWordId={selectedWordId}
        />
    );
};

const getComponentWithPostProcessingProps = (
    width = 400,
    height = 400,
    isProcessing = false,
    wordList = words,
    getWordCloudLabelPartialStyle = () => {},
    onSelectWord = () => { jest.fn() },
    selectedWordId = ''
) => {
    return (
        <WordCloud
            width={width}
            height={height}
            isProcessing={isProcessing}
            wordList={wordList}
            getWordCloudLabelPartialStyle={getWordCloudLabelPartialStyle}
            onSelectWord={onSelectWord}
            selectedWordId={selectedWordId}
        />
    );
};

describe('<WordCloud />', () => {

    it('renders default state', () => {
        const wrapper = shallow(getComponentWithDefaultProps());
        expect(wrapper.contains(<span>Cloud - Empty word list..</span>)).toEqual(true);
    });

    it('renders initial processing state', () => {
        const wrapper = shallow(getComponentWithProcessingProps());
        expect(wrapper.contains(<span>Cloud is processing..</span>)).toEqual(true);
    });

    it('checks number of rendered words', () => {
        const wrapper = shallow(getComponentWithPostProcessingProps());
        expect(wrapper.find('h1')).toHaveLength(1);
        expect(wrapper.find('svg')).toHaveLength(1);
        expect(wrapper.find('g')).toHaveLength(1);
        expect(wrapper.find('text')).toHaveLength(2);
    });

});
