import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from '../components/modal.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests for Modal Component', () => {
  test('Modal renders without crashing', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper.exists()).toBe(true);
  });
});
