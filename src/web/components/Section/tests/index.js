import Section from 'web/components/Section';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('<Section />', () => {
  let section;
  let category;
  beforeEach(() => {
    category = {
      sections: [
        {
          id: 1,
          title: 'title'
        },
        {
          id: 2,
          title: 'title 2'
        }
      ]
    };
    section = shallow(
      <Section {...{ category }} />
    );
  });

  it('should not return the section', () => {
    category = {
      sections: []
    };
    section = shallow(
      <Section {...{ category }} />
    );
    expect(section.children().length).toEqual(0);
  });

  it('should render a list of sections', () => {
    expect(section.children().length).toEqual(2);
  });

  it('section should have a minHeight of `939px`', () => {
    section = mount(
      <Section {...{ category }} />
    );
    expect(section.find('section').node.style.minHeight).toEqual('939px');
  });

  it('section should have a title', () => {
    expect(section.find('section').first().find('h1').text()).toEqual('title');
  });
});
