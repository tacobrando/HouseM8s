import { Router } from "express";
import { 
  addGroceryController, 
  deleteGroceryController, 
  getGroceryController, 
  getGroupGroceriesController,
  updateGroceryController
} from "../../../controllers/groceries/groceries.controller.js";

const router = Router({ mergeParams: true })

router.post('/add', addGroceryController)
// router.get('/:groceryId', getGroceryController)
router.put('/:groceryId/update', updateGroceryController)
router.delete('/:groceryId/delete', deleteGroceryController)
router.get('/', getGroupGroceriesController)

export default router