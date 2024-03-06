import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";

import { HttpStatus } from "../../../infra/http/http.status";
import { deleteProductParser } from "./parser";
import { deleteProductRepository } from "../../../repository/product/delete";

export async function deleteProductController(req: Request, res: Response) {
  try{
    const params = deleteProductParser(req);
    await deleteProductRepository(params);
    

    return res.status(HttpStatus.OK).send("Produto deletado com sucesso!");
  }catch(error){
    handleError(error as Error, res);
  }
}