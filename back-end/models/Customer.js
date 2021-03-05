const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String },
    phone: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Customer', customerSchema);
