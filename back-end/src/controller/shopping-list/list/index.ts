import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";
import { listShoppingListRepository } from "../../../repository/shopping-list/list";
import { listShoppingListParser } from "./parser";
//import { listShoppingListParser } from "./parser";

export async function listShoppingListController(req: Request, res: Response) {
  try{
    const queryParams = listShoppingListParser(req);
    //const params = listShoppingListParser(req);
    const shoppingList = await listShoppingListRepository(queryParams);

    return res.status(200).json(shoppingList);
  }catch(error){
    handleError(error as Error, res);
  }
}