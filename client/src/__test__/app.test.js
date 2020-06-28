import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../components/app.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Test for App Component', () => {
  test('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('calculateTotals calculates the correct balance', () => {
    const wrapper = shallow(<App />);
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
    const wrapper = shallow(<App />);
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
    const wrapper = shallow(<App />);
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
});
