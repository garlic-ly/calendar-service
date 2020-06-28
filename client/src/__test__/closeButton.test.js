import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CloseButton from '../components/closeButton.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests for CloseButton Component', () => {
  test('CloseButton renders without crashing', () => {
    const mockFn = jest.fn();
    const options = {
      calendarToggle: mockFn,
    };
    const wrapper = shallow(<CloseButton {...options} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('Tests that click event registers', () => {
    const mockFn = jest.fn();
    const options = {
      calendarToggle: mockFn,
    };
    const closeButton = shallow(<CloseButton {...options} />);
    closeButton.find('.close-button').simulate('click');
    expect(mockFn.mock.calls.length).toEqual(1);
  });
});
