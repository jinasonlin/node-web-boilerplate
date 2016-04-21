function query(options) {
  if (!options) {
    options = {};
  }
  var criteria = options.criteria || {};

  return this.findOne(criteria);
}

module.exports = query;
