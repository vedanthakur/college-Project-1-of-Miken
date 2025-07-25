import orderModel from "../models/orderModel.js"; 
import orderFoodModel from "../models/orderFoodModel.js"; 

import fs from 'fs';



// Create a new order
const createOrder = async (req, res) => {
    try {
        // console.log("Creating order with data:", req.body);
        // Extract order data and order food items from request body
        const { order, orderFoods } = req.body;

        // Create the order
        const newOrder = new orderModel(order);
        const savedOrder = await newOrder.save();

        // Create order food items, linking them to the new order
        const orderFoodDocs = orderFoods.map(item => ({
            ...item,
            order_id: savedOrder._id
        }));

        const savedOrderFoods = await orderFoodModel.insertMany(orderFoodDocs);

        res.status(201).json({
            order: savedOrder,
            orderFoods: savedOrderFoods
        });
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

// Export all functions, including the new updateorderPrice
export {createOrder, getOrders, getOrderById, updateOrder, deleteOrder};
