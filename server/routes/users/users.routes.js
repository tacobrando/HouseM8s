import { Router } from "express";
import { getCookie, registerUserController } from "../../controllers/users/users.controller.js";

const router = Router()

router.post('/register', registerUserController)
router.get('/get-cookie', getCookie)

export default router