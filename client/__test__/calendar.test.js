import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import moment from 'moment';
import Adapter from 'enzyme-adapter-react-16';
import Calendar from '../components/calendar.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests for Calendar Component', () => {
  test('Calendar renders without crashing', () => {
    const wrapper = shallow(<Calendar bookedNights={[]} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('thead').length).toBe(2);
  });

  test('isBooked correctly marks booked dates', () => {
    const options = [
      {
        startDate: '07/01/2020',
        endDate: '07/07/2020',
      }
    ];
    const selectedMoment = moment('07/03/2020');
    const wrapper = shallow(<Calendar bookedNights={options} />);
    const instance = wrapper.instance();
    const result = instance.isBooked('3', selectedMoment);
    expect(result).toBe(true);
  });

  test('isBooked correctly marks booked dates', () => {
    const options = [
      {
        startDate: '07/01/2020',
        endDate: '07/07/2020',
      }
    ];
    const selectedMoment = moment('07/03/2020');
    const wrapper = shallow(<Calendar bookedNights={options} />);
    const instance = wrapper.instance();
    const result = instance.isBooked('3', selectedMoment);
    expect(result).toBe(true);
  });

  test('createDate creates the correctly formatted date', () => {
    const selectedMoment = moment('07/05/2020');
    const wrapper = shallow(<Calendar bookedNights={[]} />);
    const instance = wrapper.instance();
    const result = instance.createDate('3', selectedMoment);
    expect(result).toBe('07/03/2020');
  });

  test('partOfRes returns true when date falls between check-in and checkout', () => {
    const selectedMoment = moment('07/05/2020');
    const wrapper = shallow(<Calendar checkin={'07/01/2020'} checkout={'07/03/2020'} bookedNights={[]} />);
    const instance = wrapper.instance();
    const result = instance.partOfRes('2', selectedMoment);
    expect(result).toBe(true);
  });
});
