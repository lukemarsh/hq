import MenuCategory from 'web/components/Menu/MenuCategory';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

describe('<MenuCategory />', () => {
  let menuCategory;
  beforeEach(() => {
    const props = {
      activeSection: '',
      category: {
        sections: []
      },
      dispatch: expect.createSpy()
    };
    menuCategory = mount(
      <MenuCategory {...{ ...props }} />
    );
  });
  it('should dispatch toggleModal', () => {
    menuCategory.find('.icon-circle-plus').simulate('click');
    expect(menuCategory.props().dispatch).toHaveBeenCalled();
  });
});
