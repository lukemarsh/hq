const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const componentSchema = new Schema({
  componentType: String,
  data: {},
  searchText: String,
  order: Number,
  sectionid: Schema.Types.ObjectId,
  categoryid: Schema.Types.ObjectId
});

componentSchema.plugin(findOrCreate);

module.exports = mongoose.model('Component', componentSchema);
