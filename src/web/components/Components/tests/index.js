import Components from 'web/components/Components';
import Component from 'web/components/Component';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Components />', () => {
  it('should render no components', () => {
    const renderedComponent = shallow(
      <Components />
    );
    expect(renderedComponent.find(Component).length).toEqual(0);
  });

  it('should render a list of components', () => {
    const components = [
      {
        id: 1
      },
      {
        id: 2
      }
    ];
    const renderedComponent = shallow(
      <Components {...{ components }} />
    );
    expect(renderedComponent.find(Component).length).toEqual(2);
  });
});
