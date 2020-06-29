import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CalendarApp from '../components/calendarApp.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Test for CalendarApp Component', () => {
  test('CalendarApp renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CalendarApp />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('calculateTotals calculates the correct balance', () => {
    const wrapper = shallow(<CalendarApp />);
    const instance = wrapper.instance();
    instance.state.checkin = '07/01/2020';
    instance.state.checkout = '07/03/2020';
    instance.state.nightlyRate = 100;
    instance.state.cleaningFee = 100;
    instance.calculateTotals();
    expect(instance.state.total).toBe(324);
    expect(instance.state.taxes).toBe(24);
    expect(instance.state.totalDays).toBe(2);
  });

  test('addGuestCount increases correctly', () => {
    const wrapper = shallow(<CalendarApp />);
    const instance = wrapper.instance();
    let e = {
      target: {
        name: 'adults',
      },
    };
    expect(instance.state.adults).toBe(1);
    expect(instance.state.guestCount).toBe(1);
    instance.addGuestCount(e);
    expect(instance.state.adults).toBe(2);
    expect(instance.state.guestCount).toBe(2);
    e.target.name = 'infants';
    instance.addGuestCount(e);
    expect(instance.state.infants).toBe(1);
    expect(instance.state.guestCount).toBe(3);
  });

  test('minusGuestCount decreases correctly', () => {
    const wrapper = shallow(<CalendarApp />);
    const instance = wrapper.instance();
    let e = {
      target: {
        name: 'adults',
      },
    };
    expect(instance.state.adults).toBe(1);
    expect(instance.state.guestCount).toBe(1);
    instance.addGuestCount(e);
    instance.addGuestCount(e);
    expect(instance.state.adults).toBe(3);
    expect(instance.state.guestCount).toBe(3);
    instance.minusGuestCount(e);
    instance.minusGuestCount(e);
    instance.minusGuestCount(e);
    expect(instance.state.adults).toBe(1);
    expect(instance.state.guestCount).toBe(1);
  });

  test('updateDates changes the check-in date', () => {
    const wrapper = shallow(<CalendarApp />);
    const instance = wrapper.instance();
    expect(instance.state.clickCount).toBe(1);
    expect(instance.state.checkin).toBe('Add date');
    instance.updateDates('07/06/2020');
    expect(instance.state.clickCount).toBe(2);
    expect(instance.state.checkin).toBe('07/06/2020');
  });

  test('calendarToggle changes the calendarOpen state', () => {
    const wrapper = shallow(<CalendarApp />);
    const instance = wrapper.instance();
    expect(instance.state.calendarOpen).toBe(false);
    instance.calendarToggle();
    expect(instance.state.calendarOpen).toBe(true);
  });

  test('guestMenuToggle changes the isGuestDropdownOpen state', () => {
    const wrapper = shallow(<CalendarApp />);
    const instance = wrapper.instance();
    expect(instance.state.isGuestDropdownOpen).toBe(false);
    instance.guestMenuToggle();
    expect(instance.state.isGuestDropdownOpen).toBe(true);
  });
});
