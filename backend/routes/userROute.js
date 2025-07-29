import express from "express"
import { loginUser,registerUser, registerUserByAdmin } from "../controllers/userController.js"
import authMiddleware from "../middleware/auth.js"
import authRoles from "../middleware/roleMiddleware.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/admin/register", authMiddleware, authRoles("admin"), registerUserByAdmin)
userRouter.post("/login", loginUser)

export default userRouter;