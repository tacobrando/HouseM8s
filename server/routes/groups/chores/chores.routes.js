import { Router } from "express";
import { 
  addChoreController, 
  getChoreController 
} from "../../../controllers/chores/chores.controller.js";

const router = Router({ mergeParams: true })

router.post('/add', addChoreController)
router.get('/:choreId', getChoreController)

export default router