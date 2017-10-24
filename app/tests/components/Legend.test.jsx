import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import Legend from '../../components/App/Cloud/InfoBar/PageType/Legend';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Fake media data
 * @type {Array}
 */
const dataList = [
  {
    label: 'Jest test - Legend - Label 1',
    value: 37,
    color: 'Jest test - Legend - Color 1',
  }, {
    label: 'Jest test - Legend - Label 2',
    value: 42,
    color: 'Jest test - Legend - Color 2',
  }, {
    label: 'Jest test - Legend - Label 3',
    value: 58,
    color: 'Jest test - Legend - Color 3',
  }
];

const getComponentWithDefaultProps = (
  data = dataList,
  width = 150,
  height = 100,
) => (
  <Legend
    data={data}
    width={width}
    height={height}
  />
);

describe('<Legend />', () => {
  it('renders a legend', () => {
    const wrapper = shallow(getComponentWithDefaultProps());
    expect(wrapper.find('svg')).toHaveLength(2);
    expect(wrapper.find('g')).toHaveLength(2);
  });

  it('checks the number of rect and text', () => {
    const wrapper = shallow(getComponentWithDefaultProps());
    expect(wrapper.find('rect')).toHaveLength(3);
    expect(wrapper.find('text')).toHaveLength(3);
  });
});
