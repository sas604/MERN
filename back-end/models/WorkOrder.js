const mongoose = require('mongoose');

const workOrderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Customer',
      required: 'You mast supply a Customer!',
    },
    invoice: String,
    year: Number,
    make: String,
    model: String,
    services: [{ name: String, parts: String }],
    totalParts: Number,
    dateRecived: Date,
    colorTag: String,
    recivedBy: String,
    shiping: String,
    photos: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('WorkOrder', workOrderSchema);
