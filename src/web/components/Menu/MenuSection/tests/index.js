import MenuSection from 'web/components/Menu/MenuSection';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

describe('<MenuSection />', () => {
  let menuSection;
  beforeEach(() => {
    const props = {
      activeSection: '',
      category: {
        sections: []
      },
      section: {},
      dispatch: expect.createSpy()
    };
    menuSection = mount(
      <MenuSection {...{ ...props }} />
    );
  });
  it('should dispatch toggleModal', () => {
    menuSection.find('.icon-circle-cross').simulate('click');
    expect(menuSection.props().dispatch).toHaveBeenCalled();
  });
});
