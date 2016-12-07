import 'babel-polyfill';

import express from 'express';
import _ from 'lodash';
import q from 'q';
import should from 'should';
import request from 'supertest';
import mongoose from 'mongoose';
import async from 'async';
import passportStub from 'passport-stub';
import searchClient from '../services/search_client';

const ObjectId = require('mongoose').Types.ObjectId;
const Category = require('../models/Category');
const app = express();

// passportStub.install(app);

describe('Routing', () => {
  let categories;

  beforeEach((done) => {
    passportStub.logout();
    mongoose.connection.db.dropDatabase();

    searchClient.deleteAllIndices().then(() => {
      async.timesSeries(5, (n, next) => {
        Category.create({
          title: `test${n}`,
          order: n,
          _id: new ObjectId(),
          sections: _.times(3, (s) => ({
            _id: new ObjectId(),
            title: `sect${s}_${n}`,
            order: s
          }))
        },
        (err, c) => { next(err, c); });
      }, (err, createdCategories) => {
        categories = createdCategories;

        const indexPromises = categories.map((category) => searchClient.createCategory(category.title, category.id)
          .then(() => {
            const sectionIndexPromises = (category.sections || []).map((section) => searchClient.createSection(section.title, category.id, section.id));

            return q.all(sectionIndexPromises);
          }));

        q.all(indexPromises).then(() => { done(); });
      });
    });
  });

  describe('Categories', () => {
    it('should return a list of categories', (done) => {
      passportStub.login({ username: 'john.doe' });

      request(app)
      .get('/categories')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.body.data.length.should.eql(categories.length);
        res.body.data[0].should.have.properties('id', 'title', 'order');
        res.body.data[0].should.not.have.property('sections');
        done();
      });
    });

    it('should return a list of categories with sections', (done) => {
      passportStub.login({ username: 'john.doe' });

      request(app)
      .get('/categories?includes=sections')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.body.data.length.should.eql(categories.length);
        res.body.data[0].should.have.properties('id', 'title', 'order', 'sections');
        res.body.data[0].sections.length.should.eql(3);
        res.body.data[0].sections[0].should.have.properties('id', 'title', 'order');
        done();
      });
    });

    it('should return a single category', (done) => {
      const category = _.sample(categories);
      passportStub.login({ username: 'john.doe' });

      request(app)
      .get(`/categories/${category.id}`)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.body.data.id.should.eql(category.id);
        res.body.data.title.should.eql(category.title);
        res.body.data.order.should.eql(category.order);
        res.body.data.should.not.have.property('sections');
        done();
      });
    });

    it('should return a single category with sections', (done) => {
      const category = _.sample(categories);
      passportStub.login({ username: 'john.doe' });

      request(app)
      .get(`/categories/${category.id}?includes=sections`)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.body.data.id.should.eql(category.id);
        res.body.data.title.should.eql(category.title);
        res.body.data.order.should.eql(category.order);
        res.body.data.sections.length.should.eql(3);
        done();
      });
    });

    it('should delete a single category', (done) => {
      const category = _.sample(categories);
      passportStub.login({ username: 'john.doe' });

      request(app)
      .delete(`/categories/${category.id}`)
      .expect(204)
      .end((err) => {
        should.not.exist(err);

        Category.findById(category.id, (e, cat) => {
          should.not.exist(e);
          should.not.exist(cat);
          done();
        });
      });
    });

    it('should treat category deletes as idempotent', (done) => {
      const category = _.sample(categories);
      passportStub.login({ username: 'john.doe' });

      request(app)
      .delete(`/categories/${category.id}`)
      .expect(204)
      .end(() => {
        Category.findById(category.id, (error, cat) => {
          should.not.exist(error);
          should.not.exist(cat);

          request(app)
          .delete(`/categories/${category.id}`)
          .expect(204)
          .end((err) => {
            should.not.exist(err);

            Category.findById(category.id, (e, c) => {
              should.not.exist(e);
              should.not.exist(c);
              done();
            });
          });
        });
      });
    });

    it('should delete a single section', (done) => {
      const category = _.sample(categories);
      const section = _.sample(category.sections);
      passportStub.login({ username: 'john.doe' });

      request(app)
      .delete(`/categories/${category.id}/sections/${section.id}`)
      .expect(204)
      .end((error) => {
        should.not.exist(error);

        Category.findById(category.id, (err, cat) => {
          should.not.exist(err);
          cat.sections.length.should.eql(2);
          cat.sections[0].id.should.not.eql(section.id);
          cat.sections[1].id.should.not.eql(section.id);
          done();
        });
      });
    });

    it('should treat section deletes as idempotent', (done) => {
      const category = _.sample(categories);
      const section = _.sample(category.sections);
      passportStub.login({ username: 'john.doe' });

      request(app)
      .delete(`/categories/${category.id}/sections/${section.id}`)
      .expect(204)
      .end(() => {
        Category.findById(category.id, (err) => {
          should.not.exist(err);

          request(app)
          .delete(`/categories/${category.id}/sections/${section.id}`)
          .expect(204)
          .end((e) => {
            should.not.exist(e);

            Category.findById(category.id, (error, c) => {
              should.not.exist(error);
              c.sections.length.should.eql(2);
              c.sections[0].id.should.not.eql(section.id);
              c.sections[1].id.should.not.eql(section.id);
              done();
            });
          });
        });
      });
    });

    it('should update a single category', (done) => {
      const category = _.sample(categories);
      const categoryUpdate = { title: 'NEW TITLE' };
      passportStub.login({ username: 'john.doe' });

      request(app)
      .patch(`/categories/${category.id}`)
      .send(categoryUpdate)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.body.data.should.match(categoryUpdate);

        Category.findById(category.id, (error, cat) => {
          should.not.exist(error);
          cat.should.match(categoryUpdate);
          done();
        });
      });
    });

    it('should update a single section', (done) => {
      const category = _.sample(categories);
      const categoryId = category.id;
      const sectionId = _.sample(category.sections).id;
      const sectionUpdate = { title: 'NEW TITLE' };
      passportStub.login({ username: 'john.doe' });

      request(app)
      .patch(`/categories/${categoryId}/sections/${sectionId}`)
      .send(sectionUpdate)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);

        const resultSection = res.body.data;
        resultSection.should.match(sectionUpdate);

        Category.findById(categoryId, (error, cat) => {
          should.not.exist(error);
          const dbSection = _.find(cat.sections, (s) => s.id === sectionId);
          dbSection.should.match(sectionUpdate);
          done();
        });
      });
    });

    it('should create a single category', (done) => {
      const newCategory = { title: 'NEW CAT', order: 66 };
      passportStub.login({ username: 'john.doe' });

      request(app)
      .post('/categories')
      .send(newCategory)
      .expect(201)
      .end((err, res) => {
        should.not.exist(err);
        res.body.data.should.match(newCategory);

        Category.findById(res.body.data.id, (error, category) => {
          should.not.exist(error);
          category.should.match(newCategory);
          done();
        });
      });
    });

    it('should create a single section', (done) => {
      const categoryId = _.sample(categories).id;
      const newSection = { title: 'NEW SECT', order: 55 };
      passportStub.login({ username: 'john.doe' });

      request(app)
      .post(`/categories/${categoryId}/sections`)
      .send(newSection)
      .expect(201)
      .end((err, res) => {
        should.not.exist(err);
        const resultSection = res.body.data;
        resultSection.should.match(newSection);

        Category.findById(categoryId, (error, category) => {
          should.not.exist(error);
          const dbSection = _.find(category.sections, (s) => s.id === resultSection.id);
          dbSection.should.match(newSection);
          done();
        });
      });
    });
  });
});
