import NewCategory from 'web/components/NewCategory';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('<NewCategory />', () => {
  let newcategory;
  let props;
  beforeEach(() => {
    props = {
      category: {
        title: 'New category'
      }
    };
    newcategory = shallow(
      <NewCategory {...{ props }} />
    );
  });

  it('should dispatch on submit', () => {
    newcategory = mount(
      <NewCategory {...{ props, dispatch: expect.createSpy() }} />
    );
    newcategory.find('form').simulate('submit');
    expect(newcategory.props().dispatch).toHaveBeenCalled();
  });
});
