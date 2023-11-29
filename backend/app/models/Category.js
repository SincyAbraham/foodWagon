const mongoose = require('mongoose');
const CategoryObject = require('../../database/migrations/create_Category_model') 

const Category = mongoose.model('Category', new mongoose.Schema(CategoryObject));


module.exports = Category
      