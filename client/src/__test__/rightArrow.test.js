import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RightArrowSVG from '../components/icons/rightArrowSVG.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests for RightArrowSVG Component', () => {
  test('RightArrowSVG renders without crashing', () => {
    const wrapper = shallow(<RightArrowSVG />);
    expect(wrapper.exists()).toBe(true);
  });
});
