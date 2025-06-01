const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  description: {
    type: String,
    required: false // Optional since one of your products doesn't have it
  },
  price: {
    type: Number,
    required: false // Optional
  },
  stock: {
    type: Number,
    required: false,
    default: 0
  },
  quantity: { // Some products use 'quantity' instead of 'stock'
    type: Number,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Product', productSchema);