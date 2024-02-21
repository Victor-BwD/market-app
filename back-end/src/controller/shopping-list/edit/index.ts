import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";
import { editBodyShoppingListParser, editParamsShoppingListParser } from "./parser";

import { editShoppingListRepository } from "../../../repository/shopping-list/edit";
import { HttpStatus } from "../../../infra/http/http.status";

export async function editShoppingListController(req: Request, res: Response) {
  try{
    const editingShoppingListDTO = editBodyShoppingListParser(req);
    const params = editParamsShoppingListParser(req);
    const shoppingList = await editShoppingListRepository(params, editingShoppingListDTO);

    return res.status(HttpStatus.OK).json(shoppingList);
  }catch(error){
    handleError(error as Error, res);
  }
}