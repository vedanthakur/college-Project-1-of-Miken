const mongoose = require('mongoose');

const orderFoodSchema = new mongoose.Schema({
  food_id: {
    type: mongoose.Schema.Types.ObjectId, // Assuming food_id references a Food document
    required: true,
    ref: 'foodModel' // Reference to a 'Food' model (you would need to define this model)
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId, // Assuming order_id references an Order document
    required: true,
    ref: 'OrderModel' // Reference to an 'Order' model (you would need to define this model)
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Mongoose Model
const OrderFood = mongoose.model('OrderFood', orderFoodSchema);

module.exports = OrderFood;