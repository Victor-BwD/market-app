import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";
import { getTotal, listShoppingListRepository } from "../../../repository/shopping-list/list";
import { listShoppingListParser } from "./parser";
import { HttpStatus } from "../../../infra/http/http.status";
//import { listShoppingListParser } from "./parser";

export async function listShoppingListController(req: Request, res: Response) {
  try{
    const queryParams = listShoppingListParser(req);
    //const params = listShoppingListParser(req);
    const shoppingList = await listShoppingListRepository(queryParams);

    const total = await getTotal();

    res.set("X-Total-Count", total.toString());

    return res.status(HttpStatus.OK).json(shoppingList);
  }catch(error){
    handleError(error as Error, res);
  }
}