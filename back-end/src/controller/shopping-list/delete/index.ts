import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";
import { deleteShoppingListParser } from "./parser";
import { deleteShoppingListRepository } from "../../../repository/shopping-list/delete";
//import { listShoppingListParser } from "./parser";

export async function deleteShoppingListController(req: Request, res: Response) {
  try{
    const params = deleteShoppingListParser(req);
    const shoppingListToDelete = await deleteShoppingListRepository(params);
    console.log(params);

    return res.status(200).json(shoppingListToDelete);
  }catch(error){
    handleError(error as Error, res);
  }
}