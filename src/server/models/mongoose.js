const {register, update} = require('../config/database')

var mongoose = require('mongoose');
mongoose.register = mongoose.createConnection(register, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.updates = mongoose.createConnection(update, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
module.exports = mongoose;
