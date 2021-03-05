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
customerSchema.index({
  name: 'text',
});
module.exports = mongoose.model('Customer', customerSchema);
