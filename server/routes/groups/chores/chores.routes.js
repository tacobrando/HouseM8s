import { Router } from "express";
import { 
  addChoreController, 
  getChoreController, 
  getGroupChoresController,
  updateChoreController
} from "../../../controllers/chores/chores.controller.js";

const router = Router({ mergeParams: true })

router.post('/add', addChoreController)
router.get('/:choreId', getChoreController)
router.put('/:choreId', updateChoreController)
router.get('/', getGroupChoresController)

export default router