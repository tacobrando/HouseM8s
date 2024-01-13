import { Router } from "express";
import { 
  addGroceryController, 
  deleteGroceryController, 
  getGroupGroceriesController,
  updateGroceryController
} from "../../../controllers/groceries/groceries.controller.js";

const router = Router({ mergeParams: true })

router.post('/add', addGroceryController)
router.put('/:groceryId/update', updateGroceryController)
router.delete('/:groceryId/delete', deleteGroceryController)
router.get('/', getGroupGroceriesController)

export default router