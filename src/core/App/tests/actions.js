import expect from 'expect';

import {
  SET_CURRENT_USER,
  SET_CATEGORIES,
  CATEGORY_CREATED,
  SECTION_CREATED,
  TOGGLE_MODAL,
  CREATE_CATEGORY,
  CREATE_SECTION,
  DELETE_SECTION,
  SCROLL_TO_SECTION,
  SET_CLOSEST_SECTION
} from '../constants';

import {
  setCurrentUser,
  setCategories,
  toggleModal,
  createCategory,
  createSection,
  deleteSection,
  scrollToSection,
  setClosestSection,
  updateCategories,
  addSectionToCategories
} from '../actions';

describe('App Actions', () => {
  describe('setCurrentUser', () => {
    const formData = {
      email: 'test@test.com',
      password: 'test'
    };

    it('data should match', () => {
      const expectedResult = {
        type: SET_CURRENT_USER,
        currentUser: formData
      };

      expect(setCurrentUser(formData)).toEqual(expectedResult);
    });
  });

  describe('setCategories', () => {
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

    const components = [];

    it('data should match', () => {
      const expectedResult = {
        type: SET_CATEGORIES,
        categories,
        components
      };

      expect(setCategories(categories, components)).toEqual(expectedResult);
    });
  });

  describe('updateCategories', () => {
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

    it('data should match', () => {
      const expectedResult = {
        type: CATEGORY_CREATED,
        category
      };

      expect(updateCategories(category)).toEqual(expectedResult);
    });
  });

  describe('addSectionToCategories', () => {
    const category = {};

    const section = {
      id: '58459c6cca8d7539c8071c5f',
      order: 0,
      template: 'basicpage',
      title: 'Home'
    };

    it('data should match', () => {
      const expectedResult = {
        type: SECTION_CREATED,
        category,
        section
      };

      expect(addSectionToCategories(category, section)).toEqual(expectedResult);
    });
  });

  describe('toggleModal', () => {
    it('data should match', () => {
      const component = 'newCategory';
      const title = 'New Category';
      const expectedResult = {
        type: TOGGLE_MODAL,
        component,
        props: { title }
      };

      expect(toggleModal(component, { title })).toEqual(expectedResult);
    });
  });

  describe('createCategory', () => {
    it('data should match', () => {
      const title = 'new category';
      const expectedResult = {
        type: CREATE_CATEGORY,
        title
      };

      expect(createCategory(title)).toEqual(expectedResult);
    });
  });

  describe('createSection', () => {
    it('data should match', () => {
      const category = {};
      const title = 'new section';
      const expectedResult = {
        type: CREATE_SECTION,
        category,
        title
      };

      expect(createSection(category, title)).toEqual(expectedResult);
    });
  });

  describe('deleteSection', () => {
    it('data should match', () => {
      const category = {};
      const sectionId = 123;
      const expectedResult = {
        type: DELETE_SECTION,
        category,
        sectionId
      };

      expect(deleteSection(category, sectionId)).toEqual(expectedResult);
    });
  });

  describe('scrollToSection', () => {
    it('data should match', () => {
      const sectionId = 123;
      const expectedResult = {
        type: SCROLL_TO_SECTION,
        sectionId
      };

      expect(scrollToSection(sectionId)).toEqual(expectedResult);
    });
  });

  describe('setClosestSection', () => {
    it('data should match', () => {
      const sectionId = 123;
      const expectedResult = {
        type: SET_CLOSEST_SECTION,
        sectionId
      };

      expect(setClosestSection(sectionId)).toEqual(expectedResult);
    });
  });
});
