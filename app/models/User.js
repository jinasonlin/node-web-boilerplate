/**
 *
 * User Schema
 *
 */

var mongoose = require('mongoose');
var userPlugin = require('../../lib/mongoose-plugin/user');
var queryPlugin = require('../../lib/mongoose-plugin/query');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  username: {
    type: String,
    default: '',
    unique: true,
    required: true
  },
  gender: { type: String, enum: ['Female', 'Male', 'Other'] },
  birthday: { type: Date },
  nationality: { type: String },
  mobile: { type: String, match: /^1[1-9]\d{9}$/ },
  email: { type: String, match: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/ },
  bindingMobile: { type: String, default: '', match: /^1[1-9]\d{9}$/ },
  bindingEmail: { type: String, default: '', match: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/ },
  avatar: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },

  type: { type: String, default: 'General', enum: ['General', 'SuperAdmin', 'Admin', 'Wechat'] },
  provider: { type: String, default: 'local' },
  wechat: {},

  createdAt: { type: Date, default: Date.now },
  lastModifiedAt: { type: Date }
});


/**
 * User plugin
 */
UserSchema.plugin(userPlugin);
UserSchema.plugin(queryPlugin);

mongoose.model('User', UserSchema);
