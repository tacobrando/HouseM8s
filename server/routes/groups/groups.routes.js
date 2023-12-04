import { Router } from "express"
import choreRoutes from './chores/chores.routes.js'
import groceryRoutes from './groceries/groceries.routes.js'
import { addGroupController } from "../../controllers/groups/groups.controller.js"
import { authenticateToken } from "../../middleware/auth/auth.middleware.js"

const router = Router()

router.use(authenticateToken)

router.use('/:groupId/chores', choreRoutes)
router.use(':groupId/groceries', groceryRoutes)

router.post('/add', addGroupController)

export default router