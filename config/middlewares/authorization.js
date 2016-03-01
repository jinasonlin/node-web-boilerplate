'use strict';
/*
 *  Generic require login routing middleware
 */

var config = require('../../config/config');
var env = process.env.NODE_ENV || 'development';
var qs = require('querystring');
var _ = require('underscore');

var isLogin = function (req, res, next) {
  var returnUrl = encodeURIComponent(req.originalUrl);
  if (req.user) {
    if (req.user.type === 'SuperAdmin' || req.user.type === 'Admin') {
      if (req.isNotPageRequest) {
        res.json({
          error_code: '20009',
          error: '您不是终端用户，请重新登录',
          request: req.path
        });
        return;
      }
      
      if (req.isWechatVisit) {
        req.session.returnUrl = returnUrl;
        var querystring = '';
        if (req.wechatOauthOptions) {
          querystring = '?' + qs.stringify(req.wechatOauthOptions);
        }
        return res.redirect('/auth/wechat' + querystring);
      }
      return res.redirect('/login?returnUrl=' + returnUrl);
    }
    return next();
  }

  if (req.isNotPageRequest) {
    res.json({
      error_code: '20009',
      error: '您还没有登录，请登录',
      request: req.path
    });
    return;
  }

  if (req.isWechatVisit) {
    req.session.returnUrl = returnUrl;
    var querystring = '';
    if (req.wechatOauthOptions) {
      querystring = '?' + qs.stringify(req.wechatOauthOptions);
    }
    return res.redirect('/auth/wechat' + querystring);
  }
  return res.redirect('/login?returnUrl=' + returnUrl);
};

var isAdminLogin = function (req, res, next) {
  var returnUrl = encodeURIComponent(req.originalUrl);
  if (req.user) {
    if (req.user.type === 'SuperAdmin' || req.user.type === 'Admin') {
      return next();
    }
    if (req.isNotPageRequest) {
      res.json({
        error_code: '20009',
        error: '您不是平台管理员',
        request: req.path
      });
      return;
    }
    return res.redirect('/administration/login?returnUrl=' + returnUrl);
  }

  if (req.isNotPageRequest) {
    res.json({
      error_code: '20009',
      error: '您还没有登录，请先登录',
      request: req.path
    });
    return;
  }
  return res.redirect('/administration/login?returnUrl=' + returnUrl);
};

var unAuthorizeUser = function (req, res, next) {
  if (req.isNotPageRequest) {
    res.json({
      error_code: '20011',
      error: '您不是合法用户',
      request: req.path
    });
    return;
  }
  res.redirect('/unauthorize');
};

var isSuperAdminUser = function (req, res, next) {
  if (req.user.type !== 'SuperAdmin') {
    return unAuthorizeUser(req, res, next, true);
  }
  next();
};

var isGeneralEndUser = function (req, res, next) {
  if (req.user.type !== 'General') {
    return unAuthorizeUser(req, res, next, true);
  }
  next();
};

var unWechatUserVisit = function (req, res) {
  if (req.isNotPageRequest) {
    res.json({
      error_code: '20011',
      error: '请使用微信浏览器浏览',
      request: req.path
    });
    return;
  }
  var returnUrl = encodeURIComponent(req.originalUrl);
  req.session.returnUrl = returnUrl;
  var querystring = '';
  if (req.wechatOauthOptions) {
    querystring = '?' + qs.stringify(req.wechatOauthOptions);
  }
  return res.redirect('/auth/wechat' + querystring);
};

var isWechatEndUser = function (req, res, next) {
  if (!req.isWechatVisit) {
    return unWechatUserVisit(req, res);
  }
  if (req.user.type !== 'Wechat') {
    return unWechatUserVisit(req, res);
  }
  next();
};

var wechatVisitAuthElseGoAhead = function (req, res, next) {
  if (req.hostname !== config.domainHost) {
    return next();
  }
  if (!req.isWechatVisit) {
    return next();
  }
  if (!req.user || req.user.type !== 'Wechat') {
    return unWechatUserVisit(req, res);
  }
  next();
};

var wechatVisitAuthClean = function (req, res, next) {
  if (req.hostname !== config.domainHost) {
    return next();
  }
  if (req.isWechatVisit && req.user && req.user.type !== 'Wechat') {
    req.logout();
  }
  next();
};

var settingWechatAuthOptions = function (options) {
  return function (req, res, next) {
    req.wechatOauthOptions = options || {}
    next();
  };
};

var wechatAuthOptions = {
  base: settingWechatAuthOptions({
    scope: 'snsapi_base'
  }),
  info: settingWechatAuthOptions({
    scope: 'snsapi_userinfo'
  })
  // website: settingWechatAuthOptions({
  //   name: 'wechatWebsite',
  //   scope: 'snsapi_login'
  // })
};

exports.wechatVisitAuthClean = wechatVisitAuthClean;
exports.requireEndUser = [wechatAuthOptions.info, isLogin];
exports.requireGeneralEndUser = [wechatAuthOptions.info, isLogin, isGeneralEndUser];
exports.requireWechatEndUser = [wechatAuthOptions.info, isLogin, isWechatEndUser];
exports.ifWechatNeedAuthElseGoAhead = [wechatAuthOptions.info, wechatVisitAuthElseGoAhead];

// only need base wechat auth.
exports.requireEndUserOrBaseWechatAuth = [wechatAuthOptions.base, isLogin];
exports.requireWechatBaseEndUser = [wechatAuthOptions.base, isLogin, isWechatEndUser];
exports.ifWechatNeedBaseAuthElseGoAhead = [wechatAuthOptions.base, wechatVisitAuthElseGoAhead];


exports.requireAdminUser = [isAdminLogin];
exports.requireSuperAdminUser = [isAdminLogin, isSuperAdminUser];
