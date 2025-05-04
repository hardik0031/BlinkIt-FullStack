import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddcategoryController, deleteCategoryController, getCategoryController, updateCategorycontroller } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", auth, AddcategoryController);
categoryRouter.get('/get',getCategoryController)
categoryRouter.put('/update',auth,updateCategorycontroller)
categoryRouter.delete("/delete",auth,deleteCategoryController)

export default categoryRouter;