const mongoose = require('mongoose');
const TemporalUserObject = require('../../database/migrations/create_TemporalUser_model') 

const TemporalUser = mongoose.model('TemporalUser', new mongoose.Schema(TemporalUserObject));


module.exports = TemporalUser
      