const express = require('express');
const router = new express.Router();

const ResponseHelper = require('./response_helper');
const User = require('../models/User');

router.get('/', (req, res) => {
  const query = User.findOne();
  query.exec(ResponseHelper.sanitizeAndSendResponse(res));
});


module.exports = router;
