import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";
import { CreateShoppingListParser } from "./parser";
import { CreateShoppingListRepository } from "../../../repository/shopping-list/create";
import { HttpStatus } from "../../../infra/http/http.status";
import { ResponseDTO } from "../../../helpers/utils/responseDTO";

export async function CreateShoppingListController(req: Request, res: Response) {
  try{
    const shoppingListDTO =  await CreateShoppingListParser(req);
    const shoppingList = await CreateShoppingListRepository(shoppingListDTO);

    const responseDTO = new ResponseDTO(HttpStatus.CREATED, "List created successfully", shoppingList);

    return res.status(HttpStatus.CREATED).json(responseDTO);
  }catch(error){
    handleError(error as Error, res);
  }
}