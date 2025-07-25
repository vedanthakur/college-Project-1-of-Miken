import mongoose from "mongoose";

const orderFoodSchema = new mongoose.Schema({
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'foodModel'
  },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  total_amount: { type: Number, required: false },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'userModel'
  },
  orderFoods: { type: {orderFoodSchema}, default: {} }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;


///// order /////
// totalPrice
// delivery_fee
// phone
// address
// name
// payment enum['cod', 'online_paid']
// paid_amount

// order 1 => many food

//// order_food //////
// food_id
// price
// quantity
// order_id
