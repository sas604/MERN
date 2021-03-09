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
    services: [
      {
        name: String,
        parts: String,
        done: {
          type: Boolean,
          default: false,
        },
      },
    ],
    totalParts: Number,
    dateRecived: Date,
    color: String,
    recived: String,
    shiping: String,
    photos: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('WorkOrder', workOrderSchema);
