import { Router } from "express";
import { 
  addGroceryController, 
  getGroceryController, 
  getGroupGroceriesController,
  updateGroceryController
} from "../../../controllers/groceries/groceries.controller.js";

const router = Router({ mergeParams: true })

router.post('/add', addGroceryController)
router.get('/:groceryId', getGroceryController)
router.put('/:groceryId', updateGroceryController)

router.get('/', getGroupGroceriesController)

export default router