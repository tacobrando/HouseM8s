import { Router } from "express";
import { loginController, logoutController, verifySessionController } from "../../controllers/auth/auth.controller.js";

const router = Router()

router.post('/login', loginController)
router.get('/logout', logoutController)
router.get('/verify-session', verifySessionController)

export default router