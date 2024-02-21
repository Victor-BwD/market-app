import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";
import { deleteShoppingListParser } from "./parser";
import { deleteShoppingListRepository } from "../../../repository/shopping-list/delete";
import { HttpStatus } from "../../../infra/http/http.status";

export async function deleteShoppingListController(req: Request, res: Response) {
  try{
    const params = deleteShoppingListParser(req);
    await deleteShoppingListRepository(params);
    

    return res.status(HttpStatus.OK).send("Lista deletada com sucesso!");
  }catch(error){
    handleError(error as Error, res);
  }
}