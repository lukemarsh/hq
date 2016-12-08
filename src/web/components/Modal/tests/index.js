import Modal from 'web/components/Modal';
import NewCategory from 'web/components/NewCategory';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('<Modal />', () => {
  let modal;
  let modalComponent;
  beforeEach(() => {
    modalComponent = {
      component: 'newCategory',
      props: {
        title: 'New Category'
      }
    };
    modal = shallow(
      <Modal {...{ modalComponent }} />
    );
  });

  it('shouldn`t render the modal', () => {
    modalComponent = {};
    modal = shallow(
      <Modal {...{ modalComponent }} />
    );
    expect(modal.find(NewCategory).length).toEqual(0);
  });

  it('should render the modal', () => {
    expect(modal.find(NewCategory).length).toEqual(1);
  });

  it('should render the title', () => {
    expect(modal.find('.title').text()).toEqual('New Category');
  });

  it('modal should close when pressing the Escape key', () => {
    const dispatch = expect.createSpy();
    modal = mount(
      <Modal {...{ modalComponent, dispatch }} />
    );
    modal.simulate('keydown', { keyCode: 27 });
    expect(dispatch).toHaveBeenCalled();
  });
});
