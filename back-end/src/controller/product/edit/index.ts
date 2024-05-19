import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";
import { editParamsProductParser, editProductParser } from "./parser";


import { HttpStatus } from "../../../infra/http/http.status";
import { editProductRepository } from "../../../repository/product/edit";

export async function editProductController(req: Request, res: Response) {
  try{
    const editingProductDTO = editProductParser(req);
    const params = editParamsProductParser(req);
    const product = await editProductRepository(params, editingProductDTO);

    return res.status(HttpStatus.OK).json(product);
  }catch(error){
    handleError(error as Error, res);
  }
}