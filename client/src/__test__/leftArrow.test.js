import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LeftArrowSVG from '../components/icons/leftArrowSVG.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests for LeftArrowSVG Component', () => {
  test('LeftArrowSVG renders without crashing', () => {
    const wrapper = shallow(<LeftArrowSVG />);
    expect(wrapper.exists()).toBe(true);
  });
});
