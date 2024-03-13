import { Router } from "express";
import { shoppingListUrls } from "./urls";
import { CreateShoppingListController } from "../../../controller/shopping-list/create";
import { listShoppingListController } from "../../../controller/shopping-list/list";
import { deleteShoppingListController } from "../../../controller/shopping-list/delete";
import { editShoppingListController } from "../../../controller/shopping-list/edit";
import { editFavoriteShoppingListController } from "../../../controller/shopping-list/editFavorite";

const shoppingListRouter = Router();

shoppingListRouter.post(shoppingListUrls.main, CreateShoppingListController);
shoppingListRouter.get(shoppingListUrls.main, listShoppingListController);
shoppingListRouter.delete(shoppingListUrls.main + "/:id", deleteShoppingListController);
shoppingListRouter.put(shoppingListUrls.main + "/:id", editShoppingListController);
shoppingListRouter.put(shoppingListUrls.main + "/:id/favorite", editFavoriteShoppingListController);

export { shoppingListRouter };