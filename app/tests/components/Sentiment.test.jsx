import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import Sentiment from '../../components/App/Cloud/InfoBar/Sentiment';

Enzyme.configure({ adapter: new Adapter() });

const getComponentWithSentimentInfoProps = (
  volume = 22,
  sentiment = {
      positive: 15,
      neutral: 5,
      negative: 2,
  }
) => (
  <Sentiment
    volume={volume}
    sentiment={sentiment}
  />
);

describe('<Sentiment />', () => {
    it('renders sentiment details', () => {
        const wrapper = shallow(getComponentWithSentimentInfoProps());
        expect(wrapper.find('h3')).toHaveLength(1);
        expect(wrapper.find('p')).toHaveLength(3);
    });
});
