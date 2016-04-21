/*!
 * base Madhusudhan Srinivasa mongoose-user
 * Jinason Lin <qun.lin@cloudinward.com>
 */

function userPlugin(schema, options) {
  if (!options) {
    options = {};
  }
  var crypto = require('crypto');

  /**
   * Authenticate by checking the hashed password and provided password
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api private
   */

  schema.methods.authenticate = function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  };

  /**
   * Create password salt
   *
   * @return {String}
   * @api private
   */

  schema.methods.makeSalt = function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  };

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api private
   */

  schema.methods.encryptPassword = function (password) {
    if (!password) { return ''; }
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  };

  /**
   * Virtuals
   */

  /**
   * Password virtual
   */

  schema.virtual('password')
    .set(function (password) {
      this._password = password;
      this.salt = this.makeSalt();
      this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
      return this._password;
    });

  /**
   * Skip validation virtual.
   *
   * If skipValidation attribute is set to true, validations won't be performed
   */

  schema.virtual('skipValidation')
    .set(function (val) {
      this._skipValidation = val;
    })
    .get(function () {
      return this._skipValidation;
    });

  /**
   * Validations
   */
  schema.path('hashed_password').validate(function (value) {
    if (this.skipValidation) { return true; }
    return value.length;
  }, 'Please provide a password');
}

module.exports = userPlugin;
