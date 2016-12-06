import expect from 'expect';
import { get } from 'web/utils/request';
import { call, put } from 'redux-saga/effects';
import { endpoints } from 'core/config/endpoints';
import {
  fetchCurrentUser,
  fetchCurrentUserFlow
} from '../sagas';

import {
  setCurrentUser
} from '../actions';

describe('fetchCurrentUser', () => {
  const fetchCurrentUserGenerator = fetchCurrentUser();

  const requestURL = endpoints.currentUser;
  it('should call the currentUser endpoint', () => {
    const callDescriptor = fetchCurrentUserGenerator.next().value;
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
