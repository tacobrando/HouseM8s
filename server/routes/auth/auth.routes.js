import { Router } from "express";
import { loginController, logoutController, verifyTokenController } from "../../controllers/auth/auth.controller.js";

const router = Router()

router.post('/login', loginController)
router.get('/logout', logoutController)
router.get('/verify-token', verifyTokenController)

export default router