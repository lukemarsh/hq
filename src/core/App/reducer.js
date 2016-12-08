import { fromJS } from 'immutable';
import { head } from 'ramda';

import {
  SET_CURRENT_USER,
  SET_CATEGORIES,
  TOGGLE_MODAL,
  CATEGORY_CREATED,
  SECTION_CREATED,
  SECTION_DELETED,
  SCROLL_TO_SECTION,
  SET_CLOSEST_SECTION
} from './constants';

const initialState = fromJS({
  currentUser: {
    name: ''
  },
  categories: [],
  modalComponent: {
    component: null,
    props: null
  },
  scrolledSection: null,
  activeSection: null
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state
        .set('currentUser', action.currentUser);
    case SET_CATEGORIES: {
      const categories = action.categories.map((category) => {
        const newCategory = category;
        newCategory.sections = category.sections.map((section) => {
          const newSection = section;
          newSection.components = action.components.filter(({ data }) => (head(data) ? head(data).sectionid === section.id : null));
          return newSection;
        });
        return newCategory;
      });
      return state
        .set('categories', fromJS(categories));
    }
    case CATEGORY_CREATED:
      return state
        .update('categories', (arr) => arr.push(fromJS(action.category)));
    case SECTION_CREATED: {
      const index = state.get('categories').findIndex((item) => item.get('id') === action.category.id);
      const section = action.section;
      return state
        .updateIn(['categories', index, 'sections'], (arr) => {
          section.components = [];
          return arr.push(fromJS(action.section));
        });
    }
    case SECTION_DELETED: {
      const index = state.get('categories').findIndex((item) => item.get('id') === action.category.id);
      return state
        .updateIn(['categories', index, 'sections'], (arr) =>
          arr.filter((item) => item.get('id') !== action.sectionId)
        );
    }
    case TOGGLE_MODAL:
      return state
        .setIn(['modalComponent', 'component'], action.component)
        .setIn(['modalComponent', 'props'], fromJS(action.props));
    case SCROLL_TO_SECTION:
      return state
        .set('scrolledSection', action.sectionId);
    case SET_CLOSEST_SECTION:
      return state
        .set('activeSection', action.sectionId)
        .set('scrolledSection', null);
    default:
      return state;
  }
}

export default reducer;
