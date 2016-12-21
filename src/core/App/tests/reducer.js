import expect from 'expect';
import { fromJS } from 'immutable';
import reducer from '../reducer';

import {
  setCurrentUser,
  setCategories,
  updateCategories,
  // addSectionToCategories,
  toggleModal,
  scrollToSection,
  closestSectionSet,
  slideoutMenuInitialized
} from '../actions';

describe('appReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      currentUser: null,
      categories: [],
      modalComponent: {
        component: null,
        props: null
      },
      scrolledSection: null,
      activeSection: null,
      slideoutMenu: null
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(reducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the setCurrentUser action correctly', () => {
    const currentUser = {
      email: 'test@test.com',
      password: 'test'
    };
    const expectedResult = state.set('currentUser', currentUser);
    expect(reducer(state, setCurrentUser(currentUser))).toEqual(expectedResult);
  });

  it('should handle the setCategories action correctly', () => {
    const components = [];
    const categories = [
      {
        id: '5845a4c5f983034cae0695a4',
        order: 0,
        sections: [
          {
            id: '58459c6cca8d7539c8071c5f',
            order: 0,
            template: 'basicpage',
            title: 'Home',
            components
          }
        ],
        title: 'category title'
      }
    ];

    const expectedResult = state.set('categories', fromJS(categories));
    expect(reducer(state, setCategories(categories, components))).toEqual(expectedResult);
  });

  it('should handle the updateCategories action correctly', () => {
    const category = {
      id: '5845a4c5f983034cae0695a4',
      order: 0,
      sections: [
        {
          id: '58459c6cca8d7539c8071c5f',
          order: 0,
          template: 'basicpage',
          title: 'Home'
        }
      ],
      title: 'category title'
    };

    const expectedResult = state.update('categories',
      (arr) => arr.push(fromJS(category)));

    expect(reducer(state, updateCategories(category))).toEqual(expectedResult);
  });

  // it('should handle the addSectionToCategories action correctly', () => {
  //   const category = {
  //     id: '5845a4c5f983034cae0695a4',
  //     order: 0,
  //     sections: [],
  //     title: 'category title'
  //   };
  //   const section = {
  //     id: '58459c6cca8d7539c8071c5f',
  //     order: 0,
  //     template: 'basicpage',
  //     title: 'Home'
  //   };
  //   const index = 0;

  //   const expectedResult = state.updateIn(['categories', index, 'sections'], (arr) => {
  //     section.components = [];
  //     return arr.push(fromJS(section));
  //   });

  //   expect(reducer(state, addSectionToCategories(category, section))).toEqual(expectedResult);
  // });

  it('should handle the toggleModal action correctly', () => {
    const component = {};
    const props = {};
    const expectedResult = state
      .setIn(['modalComponent', 'component'], component)
      .setIn(['modalComponent', 'props'], fromJS(props));

    expect(reducer(state, toggleModal(component, props))).toEqual(expectedResult);
  });

  it('should handle the scrollToSection action correctly', () => {
    const expectedResult = state.set('scrolledSection', 123);

    expect(reducer(state, scrollToSection(123))).toEqual(expectedResult);
  });

  it('should handle the setClosestSection action correctly', () => {
    const expectedResult = state
      .set('activeSection', 123)
      .set('scrolledSection', null);

    expect(reducer(state, closestSectionSet({ id: 123 }))).toEqual(expectedResult);
  });

  it('should handle the slideoutMenuInitialized action correctly', () => {
    const slideoutMenu = undefined;
    const expectedResult = state
      .set('slideoutMenu', slideoutMenu);

    expect(reducer(state, slideoutMenuInitialized(slideoutMenu))).toEqual(expectedResult);
  });
});
