import React from 'react';
import ReactDOM from 'react-dom';
import Guest from '../components/guest.jsx';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('Tests for Guest Component', () => {
  it('Guest renders without crashing', () => {
    const mockCallBack = jest.fn();
    const options = {
      dropdownOpen: false,
      guestMenuToggle: mockCallBack,
      guestCount: 1,
      updateGuestCount: mockCallBack,
      adults: 0,
      childrenCount: 0,
      infants: 0,
    }
    const wrapper = shallow(<Guest {...options}/>);
    expect(wrapper.exists()).toBe(true);
  });

  it('Tests click event', () => {
    const mockCallBack = jest.fn();
    const options = {
      dropdownOpen: false,
      guestMenuToggle: mockCallBack,
      guestCount: 1,
      updateGuestCount: mockCallBack,
      adults: 0,
      childrenCount: 0,
      infants: 0,
    }
    const guest = shallow((<Guest {...options}/>));
    guest.find('.guest').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});