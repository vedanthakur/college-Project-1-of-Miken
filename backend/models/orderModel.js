import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Assuming food_id references a Food document
        required: true,
        ref: 'userModel' // Reference to a 'user' model (you would need to define this model)
    },
    name:{type:String,required:true},
    delivery_fee:{type:Number,required:true},
    paid_amount:{type:Number,required:true},
    phone:{type:String,required:true},
    address:{type:String,required:true},
    paymentMethod: {
    type: String,
    required: true,
    enum: {
      values: ['cod', 'online_paid'],
      message: 'Payment method must be either "cod" or "online_paid".'
    }
  },

})

const orderModel = mongoose.models.order ||   mongoose.model("order",orderSchema)

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
