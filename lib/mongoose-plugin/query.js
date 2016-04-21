/*!
 * base query for load & list
 */

function queryPlugin(schema) {
  schema.statics.load = function (options, callback) {
    if (!options) {
      options = {};
    }
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    var criteria = options.criteria || {};

    this.findOne(criteria)
      .exec(callback);
  };

  schema.statics.list = function (options, callback) {
    if (!options) {
      options = {};
    }
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    var criteria = options.criteria || {};
    var sort = options.sort || { createdAt: -1 };
    var page = (options.page > 0 ? options.page : 1) - 1;
    var perPage = options.perPage > 100 ? 100 : (options.perPage || 30);

    return this.find(criteria)
      .sort(sort)
      .limit(perPage)
      .skip(perPage * page)
      .exec(callback);
  };
}

module.exports = queryPlugin;
