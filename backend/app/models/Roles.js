const mongoose = require('mongoose');
const RolesObject = require('../../database/migrations/create_Roles_model') 

const Roles = mongoose.model('Roles', new mongoose.Schema(RolesObject));


module.exports = Roles
      