import orderModel from "../models/orderModel.js"; // Note: It's 'models' not 'modles' - you might want to correct this in your project
import fs from 'fs';

// Add order item
const addOrder = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const order = new orderModel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await order.save();
        res.json({ success: true, message: "order Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// All order list
const listOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove order item
const removeOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.body.id);
        // Safely unlink the image if it exists
        if (order && order.image) {
            fs.unlink(`uploads/${order.image}`, (err) => {
                if (err) console.error("Error unlinking image:", err);
            });
        }

        await orderModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "order Removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// NEW FUNCTION: Update order price
const updateOrderPrice = async (req, res) => {
    try {
        const { id, price } = req.body; // Extract id and price from the request body

        // Basic validation for price
        if (price === undefined || price === null || isNaN(parseFloat(price)) || parseFloat(price) < 0) {
            return res.json({ success: false, message: "Invalid price provided." });
        }

        // Find the order item by ID and update its price
        const updatedorder = await orderModel.findByIdAndUpdate(
            id,
            { price: parseFloat(price) }, // Ensure price is a number
            { new: true, runValidators: true } // new: true returns the updated document, runValidators: true runs schema validators
        );

        if (updatedorder) {
            res.json({ success: true, message: "order price updated successfully!", data: updatedorder });
        } else {
            // If updatedorder is null, it means the ID was not found
            res.json({ success: false, message: "order item not found." });
        }

    } catch (error) {
        console.error("Error updating order price:", error); // Use console.error for errors
        res.json({ success: false, message: "Server error during price update." });
    }
};

// Export all functions, including the new updateorderPrice
export { addOrder, listOrder, removeOrder, updateOrderPrice };
