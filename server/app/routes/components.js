const _ = require('lodash');
const express = require('express');
const router = new express.Router();

const ResponseHelper = require('./response_helper');
const Component = require('../models/Component');

const allowedComponentProps = ['componentType', 'order', 'data', 'sectionid', 'categoryid'];

router.get('/', (req, res) => {
  const query = {};

  if (req.query.sectionid) {
    query.sectionid = req.query.sectionid;
  } else if (req.query.categoryid) {
    query.categoryid = req.query.categoryid;
  } else {
    res.status(400);
    res.send('Failed to specify a sectionid or categoryid filter');
    return;
  }

  Component
  .find(query)
  .sort('order')
  .exec(ResponseHelper.sanitizeAndSendResponse(res));
});

router.get('/:id', (req, res) => {
  Component.findById(req.params.id).exec(ResponseHelper.sanitizeAndSendResponse(res));
});

router.post('/', (req, res) => {
  const newComponent = _.pick(req.body, allowedComponentProps);
  Component.create(newComponent, ResponseHelper.sanitizeAndSendResponse(res, 201));
});

router.patch('/:id', (req, res) => {
  const updatedModel = _.pick(req.body, allowedComponentProps);
  const componentId = req.params.id;

  Component
  .findOneAndUpdate({ _id: componentId }, updatedModel, { new: true })
  .exec(ResponseHelper.sanitizeAndSendResponse(res));
});

router.delete('/:id', (req, res) => {
  Component.remove({ _id: req.params.id }, ResponseHelper.sanitizeAndSendResponse(res, 204));
});

module.exports = router;
