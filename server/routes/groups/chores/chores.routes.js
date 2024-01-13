import { Router } from "express";
import { 
  addChoreController, 
  deleteChoreController, 
  getGroupChoresController,
  updateChoreController
} from "../../../controllers/chores/chores.controller.js";

const router = Router({ mergeParams: true })

router.post('/add', addChoreController)
// router.get('/:choreId', getChoreController)
router.put('/:choreId/update', updateChoreController)
router.delete('/:choreId/delete', deleteChoreController)
router.get('/', getGroupChoresController)

export default router