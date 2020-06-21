import React from 'react';
import ReactDOM from 'react-dom';
import GuestDropdown from '../components/guestDropdown.jsx';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('Tests for Guest Dropdown Component', () => {
  it('GuestDropdown renders without crashing', () => {
    const wrapper = shallow(<GuestDropdown />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Tests click event', () => {
    const mockCallBack = jest.fn();

    const guest = shallow((<GuestDropdown updateGuestCount={mockCallBack}/>));
    guest.find('.adults-add').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});