import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import InfoPanel from '../../components/App/InfoPanel';

Enzyme.configure({ adapter: new Adapter() });
const MockFn = jest.fn().mockImplementation(() => {});

const getComponentWithDIsDisplayedProps = (
  isDisplayed = true,
  onModifyInfoPanelDisplayRequest = () => { MockFn(); },
) => (
  <InfoPanel
    isDisplayed={isDisplayed}
    onModifyInfoPanelDisplayRequest={onModifyInfoPanelDisplayRequest}
  />
);

describe('<InfoPanel />', () => {
  it('renders default state', () => {
    const wrapper = shallow(getComponentWithDIsDisplayedProps());
    expect(wrapper.find('h2')).toHaveLength(1);
    expect(wrapper.find('span')).toHaveLength(5);
    expect(wrapper.find('p')).toHaveLength(5);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('simulates click on each button', () => {
    const wrapper = shallow(getComponentWithDIsDisplayedProps());
    wrapper.find('button').map(b => b.simulate('click'));
    expect(MockFn.mock.calls).toHaveLength(1);
  });
});
