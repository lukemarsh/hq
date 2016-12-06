const baseUrl = 'http://localhost:8080/api';

export const endpoints = {
  currentUser: `${baseUrl}/current_user`,
  categories: `${baseUrl}/categories`,
  components: `${baseUrl}/components`
};

export const components = (sectionId) =>
  `${endpoints.components}?sectionid=${sectionId}`;
