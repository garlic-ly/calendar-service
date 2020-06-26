import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from '../components/calendar.jsx';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('Tests for Calendar Component', () => {
  test('Calendar renders without crashing', () => {

    const wrapper = shallow(<Calendar bookedNights={[]}/>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('thead').length).toBe(2);
  });
});
