import React from 'react';
import ReactDOM from 'react-dom';
import GuestDropdown from '../components/guestDropdown.jsx';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('Tests for Guest Dropdown Component', () => {
  it('GuestDropdown renders without crashing', () => {
    const mockCallBack = jest.fn();
    const options = {
      updateGuestCount: mockCallBack,
      adults: 1,
      childrenCount: 0,
      infants: 0,
    }
    const wrapper = shallow(<GuestDropdown {...options}/>);
    expect(wrapper.exists()).toBe(true);
  });

  it('Tests click event', () => {
    const mockCallBack = jest.fn(() => {
      options.adults = options.adults + 1;
    });
    const options = {
      updateGuestCount: mockCallBack,
      adults: 1,
      childrenCount: 0,
      infants: 0,
    }
    const guest = shallow((<GuestDropdown {...options}/>));
    expect(options.adults).toBe(1);
    guest.find('.adults-add').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
    expect(options.adults).toBe(2);
  });
});