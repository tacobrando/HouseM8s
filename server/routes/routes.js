import { Router } from "express"
import groupRoutes from './groups/groups.routes.js'
import userRoutes from './users/users.routes.js'
import authRoutes from './auth/auth.routes.js'
import { authenticateToken } from "../middleware/auth/auth.middleware.js"
const router = Router()

router.use('/groups', groupRoutes)
router.use('/users', userRoutes)
router.use('/auth', authRoutes)

export default router