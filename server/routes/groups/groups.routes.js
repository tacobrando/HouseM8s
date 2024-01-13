import { Router } from "express"
import choreRoutes from './chores/chores.routes.js'
import groceryRoutes from './groceries/groceries.routes.js'
import { 
  addGroupController, 
  addUserToGroupController, 
  deleteGroupController, 
  getAllGroupsController,
  removeUserFromGroupController,
  updateGroupItemController, 
} from "../../controllers/groups/groups.controller.js"
import { authenticateSession } from "../../middleware/auth/auth.middleware.js"

const router = Router()

router.use(authenticateSession)

router.use('/:groupId/chores', choreRoutes)
router.use('/:groupId/groceries', groceryRoutes)

router.put('/:groupId/add-user', addUserToGroupController)
router.delete('/:groupId/remove-user/:userId', removeUserFromGroupController)
router.post('/add', addGroupController)
router.put('/:groupId/update', updateGroupItemController)
router.get('/all', getAllGroupsController)
router.delete('/:groupId/delete', deleteGroupController)

export default router