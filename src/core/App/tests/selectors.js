import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectGlobal,
  selectCurrentUser,
  selectLocationState,
  selectCategories,
  selectModalComponent,
  selectActiveSection,
  selectScrolledSection,
  selectSlideOutMenu
} from '../selectors';

describe('selectGlobal', () => {
  const globalSelector = selectGlobal();
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(globalSelector(mockedState)).toEqual(globalState);
  });
});

describe('selectCurrentUser', () => {
  const currentUserSelector = selectCurrentUser();
  it('should select the currentUser state', () => {
    const currentUserState = fromJS({
      email: 'test@test.com',
      password: 'test'
    });
    const mockedState = fromJS({
      global: {
        currentUser: {
          email: 'test@test.com',
          password: 'test'
        }
      }
    });
    expect(currentUserSelector(mockedState)).toEqual(currentUserState);
  });
});

describe('selectLocationState', () => {
  const locationStateSelector = selectLocationState();
  it('should select the route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    expect(locationStateSelector(mockedState)).toEqual(route.toJS());
  });
});

describe('selectCategories', () => {
  const categoriesSelector = selectCategories();
  it('should select the categories state', () => {
    const categories = [
      {
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
      }
    ];
    const categoriesState = (categories);
    const mockedState = fromJS({
      global: {
        categories
      }
    });
    expect(categoriesSelector(mockedState)).toEqual(categoriesState);
  });
});

describe('selectModalComponent', () => {
  const modalComponentSelector = selectModalComponent();
  it('should select the currentUser state', () => {
    const modalComponentState = {
      component: 'newCategory',
      props: { title: 'New Category' }
    };
    const mockedState = fromJS({
      global: {
        modalComponent: {
          component: 'newCategory',
          props: { title: 'New Category' }
        }
      }
    });
    expect(modalComponentSelector(mockedState)).toEqual(modalComponentState);
  });
});

describe('selectActiveSection', () => {
  const activeSectionSelector = selectActiveSection();
  it('should select the currentUser state', () => {
    const activeSectionState = 12345;
    const mockedState = fromJS({
      global: {
        activeSection: 12345
      }
    });
    expect(activeSectionSelector(mockedState)).toEqual(activeSectionState);
  });
});

describe('selectScrolledSection', () => {
  const scrolledSectionSelector = selectScrolledSection();
  it('should select the currentUser state', () => {
    const scrolledSectionState = 12345;
    const mockedState = fromJS({
      global: {
        scrolledSection: 12345
      }
    });
    expect(scrolledSectionSelector(mockedState)).toEqual(scrolledSectionState);
  });
});

describe('selectSlideOutMenu', () => {
  const slideoutMenuSelector = selectSlideOutMenu();
  it('should select the slideoutMenu state', () => {
    const slideoutMenuState = undefined;
    const mockedState = fromJS({
      global: {
        slideoutMenu: undefined
      }
    });
    expect(slideoutMenuSelector(mockedState)).toEqual(slideoutMenuState);
  });
});
