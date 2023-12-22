import { Router } from "express";
import { getCookie, getUsersController, registerUserController } from "../../controllers/users/users.controller.js";

const router = Router()

router.post('/register', registerUserController)
router.get('/get-cookie', getCookie)
router.get('/all', getUsersController)

export default router