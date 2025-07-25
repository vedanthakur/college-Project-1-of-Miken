import express from "express";
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);           // Create a new order
router.get("/", getOrders);              // Get all orders
router.get("/:id", getOrderById);        // Get order by ID
router.put("/:id", updateOrder);         // Update order by ID
router.delete("/:id", deleteOrder);      // Delete order by ID

export default router;