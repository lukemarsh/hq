const _ = require('lodash');
const express = require('express');
const router = new express.Router();
const objectId = require('mongoose').Types.ObjectId;

const searchClient = require('../services/search_client');

const ResponseHelper = require('./response_helper');
const Category = require('../models/Category');

const allowedSectionProps = ['title', 'order', 'template', 'components'];

router.get('/', (req, res) => {
  let query = Category.find({}).sort('order');

  if (req.query.includes !== 'sections') {
    query = query.select('_id title order');
  }

  query.exec(ResponseHelper.sanitizeAndSendResponse(res));
});

router.get('/:id', (req, res) => {
  let query = Category.findById(req.params.id);

  if (req.query.includes !== 'sections') {
    query = query.select('_id title order');
  }

  query.exec(ResponseHelper.sanitizeAndSendResponse(res));
});

router.patch('/:id', (req, res) => {
  const updatedModel = _.pick(req.body, ['title', 'order']);
  const responseHandler = ResponseHelper.sanitizeAndSendResponse(res);

  Category
  .findOneAndUpdate({ _id: req.params.id }, updatedModel, { new: true })
  .select('_id title order')
  .then((category) => {
    responseHandler(null, category);
    searchClient.updateCategory(category.title, category.id, req.query.forcerefresh);
  }, (err) => {
    responseHandler(err);
  });
});

router.patch('/:id/sections/:section_id', (req, res) => {
  const updatedModel = _.pick(req.body, allowedSectionProps);
  const responseHandler = ResponseHelper.sanitizeAndSendResponse(res);

  const keys = Object.keys(updatedModel);
  const keysLen = keys.length;
  const prefix = 'sections.$.';

  for (let i = 0; i < keysLen; i += 1) {
    updatedModel[prefix + keys[i]] = updatedModel[keys[i]];
    delete updatedModel[keys[i]];
  }

  const categoryId = req.params.id;
  const sectionId = req.params.section_id;

  Category
  .findOneAndUpdate({ _id: categoryId, 'sections._id': sectionId }, updatedModel, { new: true })
  .then((category) => {
    const updateSection = category.sections.filter((section) =>
      section.id === sectionId);

    responseHandler(null, updateSection[0]);

    return updateSection[0];
  }, (err) => {
    responseHandler(err);
  })
  .then((section) => {
    searchClient.updateSection(section.title, section.id, req.query.forcerefresh);
  });
});

router.post('/', (req, res) => {
  const newCategory = _.pick(req.body, ['title', 'order']);
  const responseHandler = ResponseHelper.sanitizeAndSendResponse(res, 201);

  Category.create(newCategory)
  .then((category) => {
    responseHandler(null, category);
    searchClient.createCategory(category.title, category.id, req.query.forcerefresh);
  }, (err) => {
    responseHandler(err);
  });
});

router.post('/:id/sections', (req, res) => {
  const newSection = _.pick(req.body, allowedSectionProps);
  const responseHandler = ResponseHelper.sanitizeAndSendResponse(res, 201);
  newSection._id = objectId();
  const categoryId = req.params.id;

  Category
  .findOneAndUpdate({ _id: categoryId }, { $push: { sections: newSection } }, { new: true })
  .then((category) => {
    const sectionId = newSection._id.toHexString();

    const createdSection = category.sections.filter((section) =>
      section.id === sectionId);

    responseHandler(null, createdSection[0]);

    return createdSection[0];
  }, (err) => {
    responseHandler(err);
  })
  .then((section) => {
    searchClient.createSection(section.title, categoryId, section.id, req.query.forcerefresh);
  });
});

router.delete('/:id', (req, res) => {
  const responseHandler = ResponseHelper.sanitizeAndSendResponse(res, 204);

  Category.remove({ _id: req.params.id }).then(() => {
    responseHandler();
    searchClient.deleteCategory(req.params.id, req.query.forcerefresh).then(() => {}, (err) => {
      if (err && err.status && err.status === 404) {
        // safe to ignore
      } else {
        responseHandler(err);
      }
    });
  }, (err) => {
    responseHandler(err);
  });
});

router.delete('/:id/sections/:section_id', (req, res) => {
  const responseHandler = ResponseHelper.sanitizeAndSendResponse(res, 204);
  const categoryId = req.params.id;
  const sectionId = req.params.section_id;

  Category
  .findOneAndUpdate({ _id: categoryId }, { $pull: { sections: { _id: sectionId } } })
  .then(() => {
    responseHandler();
    searchClient.deleteSection(sectionId, req.query.forcerefresh).then(() => {}, (err) => {
      if (err && err.status && err.status === 404) {
        // safe to ignore
      } else {
        responseHandler(err);
      }
    });
  }, (err) => {
    responseHandler(err);
  });
});


module.exports = router;
