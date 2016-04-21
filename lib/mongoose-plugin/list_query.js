function query(options) {
  if (!options) {
    options = {};
  }
  var criteria = options.criteria || {};
  var sort = options.sort || { createdAt: -1 };
  var page = (options.page > 0 ? options.page : 1) - 1;
  var perPage = options.perPage > 100 ? 100 : (options.perPage || 30);

  return this.find(criteria)
    .sort(sort)
    .limit(perPage)
    .skip(perPage * page);
}

module.exports = query;
