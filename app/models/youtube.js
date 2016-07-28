var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var YoutubeProfile = mongoose.model('YoutubeProfile', new Schema({any : {}}, {strict: false}));

module.exports = YoutubeProfile;
