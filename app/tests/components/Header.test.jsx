import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import Header from '../../components/App/Header';

Enzyme.configure({ adapter: new Adapter() });
const MockFn = jest.fn().mockImplementation(() => {});

const getComponentWithDefaultProps = (
  onReloadTopicsRequest = () => { MockFn(); },
  onModifyInfoPanelDisplayRequest = () => { MockFn(); }
  ) => (
  <Header
    onReloadTopicsRequest={onReloadTopicsRequest}
    onModifyInfoPanelDisplayRequest={onModifyInfoPanelDisplayRequest}
  />
    );

describe('<Header />', () => {
    it('renders default state', () => {
        const wrapper = shallow(getComponentWithDefaultProps());
        expect(wrapper.find('span')).toHaveLength(1);
        expect(wrapper.find('button')).toHaveLength(3);
    });

    it('simulates click on each button', () => {
        const wrapper = shallow(getComponentWithDefaultProps());
        wrapper.find('button').map(b => b.simulate('click'));
        expect(MockFn.mock.calls).toHaveLength(3);
    });
});
