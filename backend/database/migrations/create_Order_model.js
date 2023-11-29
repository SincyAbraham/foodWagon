const mongoose = require("mongoose");
module.exports ={
	  orderID: { type: Number, default: Date.now },
    first_name: { type: String, require: true},
    last_name: { type: String, require: true},
    email: { type: String, require: true},
    address: { type: String, require: true},
    country: { type: String, require: true},
    state: { type: String, require: true},
    zip: { type: String, require: true},
    payment_type: { type: String, require: true},
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    description: [
      {
        product: {
          name: { type: String, require: true},
          price: { type: Number, default: 0 },
        },
        quantity: { type: Number, default: 1 },
        total: { type: Number, default: 0 },
        productdata: { type: String, require: true},
      },
    ],
    total: { type: Number, default: 0 },
    status: { type: String, enum : ['completed','delivered','pending','cancel'],default: 'pending' },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
}