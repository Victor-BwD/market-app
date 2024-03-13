import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";
import { editFavoriteShoppingListParser, editParamsShoppingListParser } from "./parser";

import { editFavoriteShoppingListRepository } from "../../../repository/shopping-list/edit";
import { HttpStatus } from "../../../infra/http/http.status";

export async function editFavoriteShoppingListController(req: Request, res: Response) {
  try{
    const editingFavoriteShoppingListDTO = editFavoriteShoppingListParser(req);
    const params = editParamsShoppingListParser(req);
    const shoppingList = await editFavoriteShoppingListRepository(params, editingFavoriteShoppingListDTO);

    return res.status(HttpStatus.OK).json(shoppingList);
  }catch(error){
    handleError(error as Error, res);
  }
}