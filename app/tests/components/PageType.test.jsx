import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import PageType from '../../components/App/Cloud/InfoBar/PageType';

Enzyme.configure({ adapter: new Adapter() });

const getComponentWithSentimentInfoProps = (
  pageType = {
    blog: 0,
    facebook: 0,
    forum: 0,
    general: 0,
    image: 0,
    news: 0,
    review: 0,
    twitter: 0,
    video: 0,
  },
  pieChartPercentage = -1,
  onPathOver = () => {},
  onPathOut = () => {}
) => (
  <PageType
    pageType={pageType}
    pieChartPercentage={pieChartPercentage}
    onPathOver={onPathOver}
    onPathOut={onPathOut}
  />
);

describe('<PageType />', () => {
  it('renders a pie chart and its legend', () => {
    const wrapper = shallow(getComponentWithSentimentInfoProps());
    expect(wrapper.find('PieChart')).toHaveLength(1);
    expect(wrapper.find('Legend')).toHaveLength(1);
  });
});
