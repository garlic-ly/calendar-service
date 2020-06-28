import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calendar from '../components/calendar.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests for Calendar Component', () => {
  test('Calendar renders without crashing', () => {
    const wrapper = shallow(<Calendar bookedNights={[]} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('thead').length).toBe(2);
  });
});
