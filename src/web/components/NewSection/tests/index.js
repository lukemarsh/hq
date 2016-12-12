import NewSection from 'web/components/NewSection';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('<NewSection />', () => {
  let newsection;
  let props;
  beforeEach(() => {
    props = {
      category: {
        title: 'New category'
      }
    };
    newsection = shallow(
      <NewSection {...{ props }} />
    );
  });

  it('should render the correct category title', () => {
    expect(newsection.find('h3').text()).toContain('New category');
  });

  it('should dispatch on submit', () => {
    newsection = mount(
      <NewSection {...{ props, dispatch: expect.createSpy() }} />
    );
    newsection.find('form').simulate('submit');
    expect(newsection.props().dispatch).toHaveBeenCalled();
  });
});
