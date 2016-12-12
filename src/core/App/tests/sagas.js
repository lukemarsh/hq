import expect from 'expect';
import { fromJS } from 'immutable';
import { get, post, remove } from 'web/utils/request';
import { call, put, select } from 'redux-saga/effects';
import { endpoints, components } from 'core/config/endpoints';
import { selectGlobal } from '../selectors';
import {
  fetchCurrentUser,
  fetchCurrentUserFlow,
  fetchCategories,
  fetchCategoriesFlow,
  fetchComponent,
  createCategory,
  createSection,
  deleteSection,
  setClosestSection
} from '../sagas';

import {
  setCurrentUser,
  updateCategories,
  addSectionToCategories,
  scrollToSection,
  sectionDeleted,
  closestSectionSet
} from '../actions';

describe('fetchCurrentUser', () => {
  const fetchCurrentUserGenerator = fetchCurrentUser();

  const requestURL = endpoints.currentUser;
  it('should call the currentUser endpoint', () => {
    const callDescriptor = fetchCurrentUserGenerator.next().value;
    expect(callDescriptor).toEqual(call(get, requestURL));
  });
});

describe('fetchCategories', () => {
  const fetchCategoriesGenerator = fetchCategories();

  const requestURL = `${endpoints.categories}?includes=sections`;
  it('should call the categories endpoint', () => {
    const callDescriptor = fetchCategoriesGenerator.next().value;
    expect(callDescriptor).toEqual(call(get, requestURL));
  });
});

describe('fetchComponent', () => {
  const fetchComponentGenerator = fetchComponent(1);

  it('should generate the componentsUrl', () => {
    const callDescriptor = fetchComponentGenerator.next().value;
    expect(callDescriptor).toEqual(call(components, 1));
  });

  it('should call the component endpoint', () => {
    const requestURL = `${endpoints.components}?sectionid=${1}`;
    const callDescriptor = fetchComponentGenerator.next(requestURL).value;
    expect(callDescriptor).toEqual(call(get, requestURL));
  });
});

describe('fetchCurrentUserFlow', () => {
  const fetchCurrentUserFlowGenerator = fetchCurrentUserFlow();

  it('should call fetchCurrentUser', () => {
    const callDescriptor = fetchCurrentUserFlowGenerator.next().value;
    expect(callDescriptor).toEqual(call(fetchCurrentUser));
  });

  it('should call SET_CURRENT_USER', () => {
    const data = {
      email: 'test@test.com',
      password: 'test'
    };
    const putDescriptor = fetchCurrentUserFlowGenerator.next({ data }).value;
    expect(putDescriptor).toEqual(put(setCurrentUser(data)));
  });
});

describe('fetchCategoriesFlow', () => {
  const fetchCategoriesFlowGenerator = fetchCategoriesFlow();

  it('should call fetchCategories', () => {
    const callDescriptor = fetchCategoriesFlowGenerator.next().value;
    expect(callDescriptor).toEqual(call(fetchCategories));
  });
});

describe('createCategory', () => {
  const title = 'title';
  const createCategoryGenerator = createCategory({ title });

  it('should select the global state', () => {
    const selectDescriptor = createCategoryGenerator.next().value;
    expect(selectDescriptor).toEqual(select(selectGlobal(fromJS({}))));
  });

  it('should call the categories endpoint', () => {
    const callDescriptor = createCategoryGenerator.next(fromJS({
      categories: []
    })).value;
    expect(callDescriptor).toEqual(call(post, endpoints.categories, {
      body: { title, order: 0 }
    }));
  });

  it('should put CATEGORY_CREATED', () => {
    const data = {
      id: 1
    };
    const putDescriptor = createCategoryGenerator.next({ data }).value;
    expect(putDescriptor).toEqual(put(updateCategories(data)));
  });
});

describe('createSection', () => {
  const category = {
    id: 1,
    sections: fromJS([])
  };
  const title = '';
  const createSectionGenerator = createSection({ category, title });

  it('should call the sections endpoint', () => {
    const callDescriptor = createSectionGenerator.next().value;
    expect(callDescriptor).toEqual(call(post, `${endpoints.categories}/${1}/sections`, {
      body: { title, order: 0, categoryId: 1 }
    }));
  });

  it('should put SECTION_CREATED', () => {
    const data = {
      id: 1
    };
    const putDescriptor = createSectionGenerator.next({ category, data }).value;
    expect(putDescriptor).toEqual(put(addSectionToCategories(category, data)));
  });

  it('should put SCROLL_TO_SECTION', () => {
    const putDescriptor = createSectionGenerator.next(1).value;
    expect(putDescriptor).toEqual(put(scrollToSection(1)));
  });
});

describe('deleteSection', () => {
  const category = {
    id: 1
  };
  const sectionId = 1;
  const deleteSectionGenerator = deleteSection({ category, sectionId });

  it('should call categories endpoint', () => {
    const callDescriptor = deleteSectionGenerator.next().value;
    expect(callDescriptor).toEqual(call(remove, `${endpoints.categories}/${category.id}/sections/${sectionId}`));
  });

  it('should put SECTION_DELETED', () => {
    const putDescriptor = deleteSectionGenerator.next({ category, sectionId }).value;
    expect(putDescriptor).toEqual(put(sectionDeleted(category, sectionId)));
  });
});

describe('setClosestSection', () => {
  const scrollTop = 1000;
  const sections = [
    {
      offsetTop: 1
    }
  ];
  const setClosestSectionGenerator = setClosestSection({ scrollTop, sections });
  const putDescriptor = setClosestSectionGenerator.next().value;
  expect(putDescriptor).toEqual(put(closestSectionSet(sections[0])));
});
