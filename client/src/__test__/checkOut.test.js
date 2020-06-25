import React from 'react';
import ReactDOM from 'react-dom';
import CheckOut from '../components/checkOut.jsx';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('Tests for CheckOut Component', () => {
  test('CheckOut renders without crashing', () => {
    const mockFn = jest.fn();
    const options = {
      calendarToggle: mockFn,
      checkout: 'Add a date',
    }

    const wrapper = shallow(<CheckOut {...options}/>);
    expect(wrapper.exists()).toBe(true);
  });

  test('Tests that click event registers', () => {
    const mockFn = jest.fn();
    const options = {
      calendarToggle: mockFn,
      checkout: 'Add a date',
    }
    const checkOut = shallow(<CheckOut {...options}/>);
    checkOut.find('div').simulate('click');
    expect(mockFn.mock.calls.length).toEqual(1);
  });
});
