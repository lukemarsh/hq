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
} from './constants';

export function setCurrentUser(currentUser) {
  return { type: SET_CURRENT_USER, currentUser };
}

export function setCategories(categories, components) {
  return { type: SET_CATEGORIES, categories, components };
}

export function updateCategories(category) {
  return { type: CATEGORY_CREATED, category };
}

export function addSectionToCategories(category, section) {
  return { type: SECTION_CREATED, category, section };
}

export function toggleModal(component, props) {
  return { type: TOGGLE_MODAL, component, props };
}

export function createCategory(title) {
  return { type: CREATE_CATEGORY, title };
}

export function createSection(category, title) {
  return { type: CREATE_SECTION, category, title };
}

export function deleteSection(category, sectionId) {
  return { type: DELETE_SECTION, category, sectionId };
}

export function scrollToSection(sectionId) {
  return { type: SCROLL_TO_SECTION, sectionId };
}

export function setClosestSection(sectionId) {
  return { type: SET_CLOSEST_SECTION, sectionId };
}
