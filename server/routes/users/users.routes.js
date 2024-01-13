import { Router } from "express";
import { getCookie, getUserController, getUsersController, registerUserController, updateUserController } from "../../controllers/users/users.controller.js";

const router = Router()

router.post('/register', registerUserController)
router.get('/get-cookie', getCookie)
router.get('/all', getUsersController)
router.get('/user/:userId', getUserController)
router.put('/user/:userId', updateUserController)

export default router