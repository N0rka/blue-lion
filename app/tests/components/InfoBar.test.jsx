import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import InfoBar from '../../components/App/Cloud/InfoBar';

Enzyme.configure({ adapter: new Adapter() });

const getComponentWithDefaultProps = (
  selectedWordInfo = null,
  pieChartPercentage = -1,
  onPathOver = () => {},
  onPathOut = () => {},
) => (
  <InfoBar
    selectedWordInfo={selectedWordInfo}
    pieChartPercentage={pieChartPercentage}
    onPathOver={onPathOver}
    onPathOut={onPathOut}
  />
);

const getComponentWithSelectedWordInfoProps = (
  selectedWordInfo = {
    label: 'Jest test - InfoBar - label',
    volume: 0,
    sentiment: {},
    pageType: {
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
  },
  pieChartPercentage = -1,
  onPathOver = () => {},
  onPathOut = () => {},
) => (
  <InfoBar
    selectedWordInfo={selectedWordInfo}
    pieChartPercentage={pieChartPercentage}
    onPathOver={onPathOver}
    onPathOut={onPathOut}
  />
);

describe('<InfoBar />', () => {
  it('renders default state', () => {
    const wrapper = shallow(getComponentWithDefaultProps());
    expect(wrapper.contains(<p>Select a topic to view its information.</p>)).toEqual(true);
  });

  it('renders selected topic information', () => {
    const wrapper = shallow(getComponentWithSelectedWordInfoProps());
    expect(wrapper.contains(<h1>Info on topic Jest test - InfoBar - label</h1>)).toEqual(true);
  });
});
