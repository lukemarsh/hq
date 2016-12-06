/* eslint-disable no-param-reassign */

function ResponseHelper() {}

ResponseHelper.prototype.sendResponseWithStatus = (res, status, err, data) => {
  if (err) {
    res.status(422);
    res.send({ message: 'Bad request' });
    return;
  }

  if (!data && status !== 204) {
    res.status(404);
    res.send({ message: 'Not found' });
    return;
  }

  res.status(status || 200);
  res.send(data ? { data } : {});
};

ResponseHelper.prototype.sanitizeDbResult = (obj) => {
  if (!obj) { return null; }
  if (!Array.isArray(obj) && !obj.toObject) { return null; }

  const sanitizeWithId = (idObj) => {
    if (!idObj) { return idObj; }

    if (idObj.toObject) {
      idObj = idObj.toObject();
    }

    if (idObj._id) {
      idObj.id = idObj._id;
      delete idObj._id;
    }

    return idObj;
  };

  const walkObjectTree = (root) => {
    if (!root) { return root; }

    if (Array.isArray(root)) {
      root = root.map((item) => {
        const sanitizedItem = sanitizeWithId(item);
        return walkObjectTree(sanitizedItem);
      });
    } else if (typeof root === 'object') {
      root = sanitizeWithId(root);

      Object.keys(root).forEach((key) => {
        root[key] = walkObjectTree(root[key]);
      });
    }

    return root;
  };

  return walkObjectTree(obj);
};

ResponseHelper.prototype.sanitizeAndSendResponse = (res, status) =>
  (err, data) => {
    if (!err && data) {
      data = ResponseHelper.prototype.sanitizeDbResult(data);
    }

    ResponseHelper.prototype.sendResponseWithStatus(res, status, err, data);
  };

module.exports = new ResponseHelper();
