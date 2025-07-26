import orderModel from "../models/orderModel.js";

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { name, total_amount, phone, address, orderFoods } = req.body;
       
        const newOrder = new orderModel({
            name,
            total_amount,
            phone,
            address,
            userId: req.userId,
            orderFoods
        });

        

        await newOrder.save();

        

        res.status(201).json({ success: "created order", order: newOrder });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an order by ID
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await orderModel.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ error: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };
