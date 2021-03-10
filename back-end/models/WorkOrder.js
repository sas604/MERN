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
        serviceTag: String,
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
    status: {
      type: String,
      enum: ['inProgress', 'readyForShiping'],
      default: 'inProgress',
    },
    needsParts: Boolean,
    whaitingForParts: Boolean,
    finished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WorkOrder', workOrderSchema);
