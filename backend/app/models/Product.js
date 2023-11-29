const mongoose = require('mongoose');
const ProductObject = require('../../database/migrations/create_Product_model') 

const Product = mongoose.model('Product', new mongoose.Schema(ProductObject));


module.exports = Product
      