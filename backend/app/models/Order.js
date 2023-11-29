const mongoose = require('mongoose');
const OrderObject = require('../../database/migrations/create_Order_model') 

const Order = mongoose.model('Order', new mongoose.Schema(OrderObject));


module.exports = Order
      