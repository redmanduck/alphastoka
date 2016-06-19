var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Profile = mongoose.model('Profile', new Schema({any : {}}, {strict: false}));

module.exports = Profile;
