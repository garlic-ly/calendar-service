import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckIn from '../components/checkIn.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests for CheckIn Component', () => {
  test('CheckIn renders without crashing', () => {
    const mockFn = jest.fn();
    const options = {
      calendarToggle: mockFn,
      checkin: 'Add a date',
    };
    const wrapper = shallow(<CheckIn {...options} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('Tests that click event registers', () => {
    const mockFn = jest.fn();
    const options = {
      calendarToggle: mockFn,
      checkin: 'Add a date',
    };
    const checkIn = shallow(<CheckIn {...options}/>);
    checkIn.find('div').simulate('click');
    expect(mockFn.mock.calls.length).toEqual(1);
  });
});
