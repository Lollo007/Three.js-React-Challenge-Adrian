import React from 'react';
import { shallow } from 'enzyme';
import View from './View';

describe('View', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<View />);
    expect(wrapper).toMatchSnapshot();
  });
});
