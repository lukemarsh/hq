import Component from 'web/components/Component';
import TextComponent from 'web/components/TextComponent';
import List from 'web/components/List';
import ImageComponent from 'web/components/ImageComponent';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Component />', () => {
  it('should render the TextComponent', () => {
    const component = {
      data: [
        {
          componentType: 'TextComponent'
        }
      ]
    };
    const renderedComponent = shallow(
      <Component {...{ component }} />
    );
    expect(renderedComponent.find(TextComponent).length).toEqual(1);
  });

  it('should render the ListComponent', () => {
    const component = {
      data: [
        {
          componentType: 'ListComponent'
        }
      ]
    };
    const renderedComponent = shallow(
      <Component {...{ component }} />
    );
    expect(renderedComponent.find(List).length).toEqual(1);
  });

  it('should render the ImageComponent', () => {
    const component = {
      data: [
        {
          componentType: 'ImageComponent'
        }
      ]
    };
    const renderedComponent = shallow(
      <Component {...{ component }} />
    );
    expect(renderedComponent.find(ImageComponent).length).toEqual(1);
  });
});
