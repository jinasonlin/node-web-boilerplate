module.exports = function (app) {
  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    if (req.isNotPageRequest) {
      return res.status(500).json({
        error_code: '500',
        error: err.stack,
        request: req.path
      });
    }
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    if (req.isNotPageRequest) {
      return res.status(404).json({
        error_code: '404',
        error: 'Not found',
        request: req.path
      });
    }
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
