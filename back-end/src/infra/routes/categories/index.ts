import { Router } from "express";
import { categoriesUrls } from "./urls";
import { listCategoriesController } from "../../../controller/categories/list";

const categoriesRouter = Router();

categoriesRouter.get(categoriesUrls.main, listCategoriesController);

export { categoriesRouter };