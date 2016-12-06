/**
 * Test the request function
 */

import { get, post, remove } from '../request';
import sinon from 'sinon';
import expect from 'expect';

describe('request', () => {
  // Before each test, stub the fetch function
  beforeEach(() => {
    sinon.stub(window, 'fetch');
  });

  // After each test, restore the fetch function
  afterEach(() => {
    window.fetch.restore();
  });

  describe('get', () => {
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 200
      });

      window.fetch.returns(Promise.resolve(res));
    });

    it('should format the response correctly', (done) => {
      get('/currentuser')
        .catch(done)
        .then((json) => {
          expect(json.hello).toEqual('world');
          done();
        });
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      const res = new Response('{}', {
        status: 200
      });

      window.fetch.returns(Promise.resolve(res));
    });

    it('should format the response correctly', (done) => {
      remove('/currentuser')
        .catch(done)
        .then((json) => {
          expect(json).toEqual({});
          done();
        });
    });
  });

  describe('post', () => {
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 201,
        headers: {
          'content-type': 'application/json',
          accept: 'application/json'
        }
      });

      window.fetch.returns(Promise.resolve(res));
    });

    it('should format the response correctly', (done) => {
      post('/currentuser')
        .catch(done)
        .then((json) => {
          expect(json.hello).toEqual('world');
          done();
        });
    });
  });

  describe('errors', () => {
    beforeEach(() => {
      const res = new Response('', {
        status: 404
      });

      window.fetch.returns(Promise.resolve(res));
    });

    it('should catch errors', (done) => {
      get('/doesntexist')
        .catch((err) => {
          expect(err.response.status).toEqual(404);
          done();
        });
    });
  });
});
