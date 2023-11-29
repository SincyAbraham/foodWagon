const mongoose = require("mongoose");
module.exports = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Roles",
    },
  ],
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
};
