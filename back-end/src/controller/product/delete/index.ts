import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";

import { HttpStatus } from "../../../infra/http/http.status";
import { deleteProductParser } from "./parser";
import { deleteProductRepository } from "../../../repository/product/delete";
import { ResponseDTO } from "../../../helpers/utils/responseDTO";

export async function deleteProductController(req: Request, res: Response) {
  try{
    const params = deleteProductParser(req);
    await deleteProductRepository(params);

    const responseDTO = new ResponseDTO(HttpStatus.OK, "Product deleted successfully");
    

    return res.status(HttpStatus.OK).json(responseDTO);
  }catch(error){
    handleError(error as Error, res);
  }
}