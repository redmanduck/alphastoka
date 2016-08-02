var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Profilesv5 = mongoose.model('Profilesv5', new Schema({any : {}}, {strict: false}));

module.exports = Profilesv5;
