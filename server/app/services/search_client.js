const elasticsearch = require('elasticsearch');
const config = require('../config');

const client = new elasticsearch.Client({
  host: config.elastic.host,
  log: config.elastic.log
});

function SearchClient() {
  this.client = client;
}

SearchClient.prototype.search = (query, titlesOnly, callback) => {
  const searchOptions = {
    index: 'tabhqreact',
    body: {
      query: {
        match_phrase_prefix: {
          text: {
            query,
            slop: 10,
            max_expansions: 50
          }
        }
      }
    }
  };

  if (titlesOnly) {
    searchOptions.type = ['category', 'section'];
  }

  return client.search(searchOptions, callback);
};

SearchClient.prototype.createCategory = (text, categoryId, refresh, callback) =>
  client.create({
    index: 'tabhqreact',
    type: 'category',
    refresh: refresh || false,
    id: categoryId,
    body: {
      text,
      category_id: categoryId
    }
  }, callback);

SearchClient.prototype.createSection = (text, categoryId, sectionId, refresh, callback) =>
  client.create({
    index: 'tabhqreact',
    type: 'section',
    refresh: refresh || false,
    id: sectionId,
    body: {
      text,
      category_id: categoryId,
      section_id: sectionId
    }
  }, callback);

SearchClient.prototype.createComponent = (text, categoryId, sectionId, componentId, refresh, callback) =>
  client.create({
    index: 'tabhqreact',
    type: 'component',
    refresh: refresh || false,
    id: componentId,
    body: {
      text,
      category_id: categoryId,
      section_id: sectionId,
      component_id: componentId
    }
  }, callback);

SearchClient.prototype.updateCategory = (text, id, refresh, callback) =>
  client.update({
    index: 'tabhqreact',
    type: 'category',
    refresh: refresh || false,
    id,
    body: {
      doc: {
        text
      }
    }
  }, callback);

SearchClient.prototype.updateSection = (text, id, refresh, callback) =>
  client.update({
    index: 'tabhqreact',
    type: 'section',
    refresh: refresh || false,
    id,
    body: {
      doc: {
        text
      }
    }
  }, callback);

SearchClient.prototype.updateComponent = (text, id, refresh, callback) =>
  client.update({
    index: 'tabhqreact',
    type: 'component',
    refresh: refresh || false,
    id,
    body: {
      doc: {
        text
      }
    }
  }, callback);

SearchClient.prototype.deleteCategory = (id, refresh, callback) =>
  client.delete({
    index: 'tabhqreact',
    type: 'category',
    refresh: refresh || false,
    id
  }, callback);

SearchClient.prototype.deleteSection = (id, refresh, callback) =>
  client.delete({
    index: 'tabhqreact',
    type: 'section',
    refresh: refresh || false,
    id
  }, callback);

SearchClient.prototype.deleteComponent = (id, refresh, callback) =>
  client.delete({
    index: 'tabhqreact',
    type: 'component',
    refresh: refresh || false,
    id
  }, callback);

SearchClient.prototype.deleteAllIndices = () =>
  client.indices.delete({ index: '_all' });

module.exports = new SearchClient(client);
