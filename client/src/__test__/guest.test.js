import React from 'react';
import ReactDOM from 'react-dom';
import Guest from '../components/guest.jsx';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('Tests for Guest Component', () => {
  it('Guest renders without crashing', () => {
    const wrapper = shallow(<Guest />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Tests click event', () => {
    const mockCallBack = jest.fn();

    const guest = shallow((<Guest guestMenuToggle={mockCallBack}/>));
    guest.find('.guest').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});