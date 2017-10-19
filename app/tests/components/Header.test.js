import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';

import Header from '../../components/App/Header';

Enzyme.configure({ adapter: new Adapter() });
const mockFn = jest.fn().mockImplementation(() => {});

const getComponentWithDefaultProps = (
    onReloadTopicsRequest = () => { new mockFn() }
) => {
    return (
        <Header
            onReloadTopicsRequest={onReloadTopicsRequest}
        />
    );
};

describe('<Header />', () => {
    it('renders default state', () => {
        const wrapper = shallow(getComponentWithDefaultProps());
        expect(wrapper.find('h1')).toHaveLength(1);
        expect(wrapper.find('button')).toHaveLength(2);
    });

    it('simulates click on each button', () => {
        const wrapper = shallow(getComponentWithDefaultProps());
        wrapper.find('button').map(b => b.simulate('click'));
        expect(mockFn.mock.calls).toHaveLength(2);
    });
});
