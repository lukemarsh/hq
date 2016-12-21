import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import { HomePage } from '../index';
import { Section } from 'web/components/Section';

describe('<HomePage />', () => {
  it('should not render any sections', () => {
    const renderedComponent = shallow(
      <HomePage {...{ categories: [] }} />
    );
    expect(renderedComponent.find(Section).length).toEqual(0);
  });

  it('should render two sections', () => {
    const renderedComponent = shallow(
      <HomePage {...{ categories: [{}, {}] }} />
    );
    expect(renderedComponent.find(Section).length).toEqual(2);
  });

  it('should call slideout.toggle()', () => {
    const slideoutMenu = {
      toggle: expect.createSpy()
    };
    const renderedComponent = shallow(
      <HomePage {...{ categories: [{}, {}], slideoutMenu }} />
    );
    renderedComponent.find('button').simulate('click');
    expect(slideoutMenu.toggle).toHaveBeenCalled();
  });

  it('setClosestSection should have been called', () => {
    const setClosestSection = expect.createSpy();
    const renderedComponent = shallow(
      <HomePage {...{ categories: [{}, {}], setClosestSection }} />
    );
    renderedComponent.find('.panel').simulate('scroll', { target: { scrollTop: 1000 } });
    expect(setClosestSection).toHaveBeenCalled();
  });

  it('initializeSlideoutMenu should have been called', () => {
    const initializeSlideoutMenu = expect.createSpy();
    mount(
      <HomePage {...{ categories: [{ sections: [] }, { sections: [] }], currentUser: {}, initializeSlideoutMenu }} />
    );
    expect(initializeSlideoutMenu).toHaveBeenCalled();
  });
});
