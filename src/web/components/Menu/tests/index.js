import Menu from 'web/components/Menu';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

describe('<Menu />', () => {
  let menu;
  beforeEach(() => {
    const props = {
      currentUser: {
        displayName: 'Luke'
      },
      categories: [],
      dispatch: expect.createSpy()
    };
    menu = mount(
      <Menu {...{ ...props }} />
    );
  });
  it('should dispatch toggleModal', () => {
    menu.find('.icon-circle-plus').simulate('click');
    expect(menu.props().dispatch).toHaveBeenCalled();
  });
});
