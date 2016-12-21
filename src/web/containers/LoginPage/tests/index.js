import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import { LoginPage } from '../index';

describe('<LoginPage />', () => {
  it('should render the page', () => {
    const renderedComponent = shallow(
      <LoginPage />
    );
    expect(renderedComponent.children.length).toEqual(1);
  });
});
