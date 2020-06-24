import React from 'react';
import ReactDOM from 'react-dom';
import CheckInOut from '../components/checkInOut.jsx';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('Tests for CheckInOut Component', () => {
  test('CheckInOut renders without crashing', () => {
    const mockFn = jest.fn();
    const options = {
      calendarToggle: mockFn,
      checkin: 'Add a date',
      checkout: 'Add a date',
    }

    const wrapper = shallow(<CheckInOut {...options}/>);
    expect(wrapper.exists()).toBe(true);
  });

  test('Tests that click event registers', () => {
    const mockFn = jest.fn();
    const options = {
      calendarToggle: mockFn,
      checkin: 'Add a date',
      checkout: 'Add a date',
    }
    const checkInOut = shallow((<CheckInOut {...options}/>));
    checkInOut.find('.checkInOut').simulate('click');
    expect(mockFn.mock.calls.length).toEqual(1);
  });
});
