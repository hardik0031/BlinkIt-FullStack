import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  addToCartItemController,
  deleteCartItemController,
  getcartItemController,
  updatecartItemQty,
} from "../controllers/cartcontroller.js";

const cartRouter = Router();

cartRouter.post("/create", auth, addToCartItemController);
cartRouter.get("/get", auth, getcartItemController);
cartRouter.put("/update-qty", auth, updatecartItemQty);
cartRouter.delete("/delete-cart-item", auth, deleteCartItemController);

export default cartRouter;
