import { Router } from "express";
import { shoppingListUrls } from "./urls";
import { CreateShoppingListController } from "../../../controller/shopping-list";

const shoppingListRouter = Router();

shoppingListRouter.post(shoppingListUrls.main, CreateShoppingListController);

export { shoppingListRouter };