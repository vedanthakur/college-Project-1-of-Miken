import mongoose from "mongoose";

const orderFoodSchema = new mongoose.Schema({
      food_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'foodModel'
      },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      order_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'orderModel'
    }
});

const orderFoodModel = mongoose.models.orderFood || mongoose.model("orderFood", orderFoodSchema);

export default orderFoodModel;