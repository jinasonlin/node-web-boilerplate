'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {type: String, default: ''},
  isActive: {type: Boolean, default: true},
  username: {
    type: String,
    default: '',
    unique: true,
    required: true
  },
  gender: {type: String, enum: ['Female', 'Male', 'Other']},
  birthday: {type: Date},
  nationality: {type: String},
  // mobile: {type: String, default: '', match: /^1[1-9]\d{9}$/}, // TODO remove
  // email: {type: String, default: '', match: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/},  // TODO remove
  bindingMobile: {type: String, default: '', match: /^1[1-9]\d{9}$/},
  bindingEmail: {type: String, default: '', match: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/},
  avatar: {type: String, default: ''},
  hashed_password: {type: String, default: ''},
  salt: {type: String, default: ''},

  type: {type: String, default: 'General', enum: ['General', 'SuperAdmin', 'Admin', 'Wechat']},
  //thirdPart login 第三方平台登陆的用户信息
  provider: {type: String, default: 'local'},
  wechat: {},

  province: {type: String},
  city: {type: String},
  area: {type: String},
  address: {type: String, default: ''},
  description: {type: String, default: ''},
  postcode: {type: String},
  idNumber: {type: String},

  degree: {type: String},
  graduateSchool: {type: String},
  graduateDate: {type: Date},

  selfIntroduction: {type: String},
  pictures: [{type: String}],

  createdAt: {type: Date, default: Date.now},
  lastModifiedAt: {type: Date}
});


/**
 * User plugin
 */

function userPlugin (schema, options) {
  var crypto = require('crypto')

  /**
   * Authenticate by checking the hashed password and provided password
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api private
   */

  schema.methods.authenticate = function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  }

  /**
   * Create password salt
   *
   * @return {String}
   * @api private
   */

  schema.methods.makeSalt = function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api private
   */

  schema.methods.encryptPassword = function (password) {
    if (!password) return ''
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
  }

  /**
   * Reset auth token
   *
   * @param {String} token
   * @param {Function} cb
   * @api private
   */

  schema.methods.resetToken = function (token, cb) {
    var self = this
    crypto.randomBytes(48, function(ex, buf) {
      self[token] = buf.toString('hex')
      if (cb) cb()
    })
  }

  /**
   * Statics
   */

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  schema.statics.load = function (options, cb) {
    var criteria = options.criteria || {}

    this.findOne(criteria)
      .exec(cb)
  }

  /**
   * List
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  schema.statics.list = function (options, cb) {
    var criteria = options.criteria || {}
    var sort = options.sort || { createdAt: -1 }
    var limit = options.limit === 0 ? 0 : (options.limit || 10)
    var page = options.page || 0

    this.find(criteria)
      .select('name username email')
      .sort(sort)
      .limit(limit)
      .skip(limit * page)
      .exec(cb)
  }

  /**
   * Virtuals
   */

  /**
   * Password virtual
   */

  schema.virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

  /**
   * Skip validation virtual.
   *
   * If skipValidation attribute is set to true, validations won't be performed
   */

  schema.virtual('skipValidation')
  .set(function(val) {
    this._skipValidation = val
  })
  .get(function() {
    return this._skipValidation
  })

  /**
   * Validations
   */
  schema.path('hashed_password').validate(function (hashed_password) {
    if (this.skipValidation) return true
    return hashed_password.length
  }, 'Please provide a password')
}

UserSchema.plugin(userPlugin, {});

mongoose.model('User', UserSchema);
