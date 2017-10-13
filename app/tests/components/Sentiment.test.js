import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import Sentiment from '../../components/App/Cloud/Sentiment';

Enzyme.configure({ adapter: new Adapter() });

const getComponentWithDefaultProps = (
    sentimentInfo = null,
) => {
    return (
        <Sentiment
            sentimentInfo={sentimentInfo}
        />
    );
};

const getComponentWithSentimentInfoProps = (
    sentiment = {
        id: 'sentimentInfo_id',
        label: 'sentimentInfo_label',
        volume: 22,
        sentiment: {
            positive: 15,
            neutral: 5,
            negative: 2
        },
    },
) => {
    return (
        <Sentiment
            sentimentInfo={sentiment}
        />
    );
};

describe('<Sentiment />', () => {

    it('renders default state', () => {
        const wrapper = shallow(getComponentWithDefaultProps());
        expect(wrapper.contains(<p>Select a topic to view its information.</p>)).toEqual(true);
    });

    it('renders sentiment details', () => {
        const wrapper = mount(getComponentWithSentimentInfoProps());
        expect(wrapper.find('h1')).toHaveLength(1);
        expect(wrapper.find('h3')).toHaveLength(1);
        expect(wrapper.find('p')).toHaveLength(3);
    });
});
