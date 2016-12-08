import Confirm from 'web/components/Confirm';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('<Confirm />', () => {
  let confirm;
  let props;
  beforeEach(() => {
    props = {
      text: 'Are you sure?',
      action: expect.createSpy()
    };
    confirm = shallow(
      <Confirm {...{ props }} />
    );
  });

  it('should render the correct text', () => {
    expect(confirm.find('p').length).toEqual(1);
    expect(confirm.find('p').text()).toEqual('Are you sure?');
  });

  it('should close the modal', () => {
    const dispatch = expect.createSpy();
    confirm = mount(
      <Confirm {...{ props, dispatch }} />
    );
    confirm.find('button[type="cancel"]').simulate('click');
    expect(dispatch).toHaveBeenCalled();
  });

  it('should submit the form', () => {
    const dispatch = expect.createSpy();
    confirm = mount(
      <Confirm {...{ props, dispatch }} />
    );
    confirm.find('form').simulate('submit');
    expect(props.action).toHaveBeenCalled();
  });
});
