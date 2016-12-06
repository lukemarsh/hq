const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const sectionSchema = new Schema({
  title: String,
  order: Number,
  template: String
});

const categorySchema = new Schema({
  title: String,
  order: Number,
  sections: [sectionSchema]
});

categorySchema.plugin(findOrCreate);

module.exports = mongoose.model('Category', categorySchema);
