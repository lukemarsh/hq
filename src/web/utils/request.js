import { is } from 'ramda';
import 'whatwg-fetch';

const postHeaders = {
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
  }
};

const parseJSON = (response) =>
  response.text().then((text) =>
    (text ? JSON.parse(text) : {})
  );

const checkStatus = (response) => {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const f = (method) => (url, data = {}) =>
  fetch(url, {
    method,
    ...(method === 'get' ? {} : postHeaders),
    ...data,
    ...(data.body && is(Object, data.body) ? { body: JSON.stringify(data.body) } : {})
  })
  .then(checkStatus)
  .then(parseJSON);

export const get = f('get');
export const remove = f('delete');
export const put = f('put');
export const post = f('post');
