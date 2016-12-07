import { fromJS } from 'immutable';
import Modal from 'web/components/Modal';
import NewCategory from 'web/components/NewCategory';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Modal />', () => {
  it('shouldn`t render the modal', () => {
    const modalComponent = fromJS({});
    const renderedComponent = shallow(
      <Modal {...{ modalComponent }} />
    );
    expect(renderedComponent.find(NewCategory).length).toEqual(0);
  });

  it('should render the modal', () => {
    const modalComponent = fromJS({
      component: 'newCategory'
    });
    const renderedComponent = shallow(
      <Modal {...{ modalComponent }} />
    );
    expect(renderedComponent.find(NewCategory).length).toEqual(1);
  });
});
