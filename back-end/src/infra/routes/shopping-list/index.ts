import { Router } from "express";
import { shoppingListUrls } from "./urls";
import { CreateShoppingListController } from "../../../controller/shopping-list/create";
import { listShoppingListController } from "../../../controller/shopping-list/list";
import { deleteShoppingListController } from "../../../controller/shopping-list/delete";

const shoppingListRouter = Router();

shoppingListRouter.post(shoppingListUrls.main, CreateShoppingListController);
shoppingListRouter.get(shoppingListUrls.main, listShoppingListController);
shoppingListRouter.delete(shoppingListUrls.main + "/:id", deleteShoppingListController);

export { shoppingListRouter };