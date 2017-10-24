import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import PieChart from '../../components/App/Cloud/InfoBar/PageType/PieChart';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Fake media data
 * @type {Array}
 */
const dataList = [
  {
    label: 'Jest test - PieChart - Label 1',
    value: 37,
    color: 'Jest test - PieChart - Color 1',
  }, {
    label: 'Jest test - PieChart - Label 2',
    value: 42,
    color: 'Jest test - PieChart - Color 2',
  }, {
    label: 'Jest test - PieChart - Label 3',
    value: 58,
    color: 'Jest test - PieChart - Color 3',
  }
];

const getComponentWithDefaultProps = (
  data = dataList,
  width = 150,
  height = 100,
  innerRadius = 40,
  outerRadius = 100,
  pieChartPercentage = -1,
  onPathOver = () => {},
  onPathOut = () => {},
) => (
  <PieChart
    data={data}
    width={width}
    height={height}
    innerRadius={innerRadius}
    outerRadius={outerRadius}
    pieChartPercentage={pieChartPercentage}
    onPathOver={onPathOver}
    onPathOut={onPathOut}
  />
);

const getComponentWithPercentageProps = (
  data = dataList,
  width = 150,
  height = 100,
  innerRadius = 40,
  outerRadius = 100,
  pieChartPercentage = 28,
  onPathOver = () => {},
  onPathOut = () => {},
) => (
  <PieChart
    data={data}
    width={width}
    height={height}
    innerRadius={innerRadius}
    outerRadius={outerRadius}
    pieChartPercentage={pieChartPercentage}
    onPathOver={onPathOver}
    onPathOut={onPathOut}
  />
);

describe('<PieChart />', () => {
  it('renders a pie chart without percentage inside', () => {
    const wrapper = shallow(getComponentWithDefaultProps());
    expect(wrapper.find('svg')).toHaveLength(1);
    expect(wrapper.find('g')).toHaveLength(1);
  });

  it('renders a pie chart with percentage inside', () => {
    const wrapper = shallow(getComponentWithPercentageProps());
    expect(wrapper.find('svg')).toHaveLength(1);
    expect(wrapper.find('g')).toHaveLength(2);
  });

  it('checks the number of path', () => {
    const wrapper = shallow(getComponentWithDefaultProps());
    expect(wrapper.find('path')).toHaveLength(3);
  });
});
