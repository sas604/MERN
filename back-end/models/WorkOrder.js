const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const workOrderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Customer',
      required: 'You mast supply a Customer!',
    },
    year: Number,
    make: String,
    model: String,
    services: [
      {
        description: String,
        serviceTag: String,
        done: {
          type: Boolean,
          default: false,
        },
      },
    ],
    totalParts: { type: Number, default: 0 },
    dateRecived: String,
    color: [String],
    recived: String,
    shiping: String,
    status: {
      type: String,
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
workOrderSchema.index({
  status: 'text',
});
workOrderSchema.plugin(AutoIncrement, { inc_field: 'invoice' });
module.exports = mongoose.model('WorkOrder', workOrderSchema);
