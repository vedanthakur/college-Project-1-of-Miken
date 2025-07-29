import express from "express";
import {
    createOrder,
    getOrders,
    getOrdersOfUser,
    getOrderById,
    updateOrder,
    deleteOrder
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import authRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);           // Create a new order
router.get("/listAdmin", authMiddleware, authRoles("admin"), getOrders);              // Get all orders
router.get("/list/", authMiddleware, authRoles("user"), getOrdersOfUser);              // Get all orders
router.get("/:id", authMiddleware, authRoles("admin", "user"), getOrderById);        // Get order by ID
router.put("/:id", authMiddleware, updateOrder);         // Update order by ID
router.delete("/:id", authMiddleware, deleteOrder);      // Delete order by ID

export default router;