import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";
import { CreateShoppingListParser } from "./parser";
import { CreateShoppingListRepository } from "../../../repository/shopping-list/create";
import { HttpStatus } from "../../../infra/http/http.status";

export async function CreateShoppingListController(req: Request, res: Response) {
  try{
    const shoppingListDTO = CreateShoppingListParser(req);
    const shoppingList = await CreateShoppingListRepository(shoppingListDTO);

    return res.status(HttpStatus.CREATED).json(shoppingList);
  }catch(error){
    handleError(error as Error, res);
  }
}