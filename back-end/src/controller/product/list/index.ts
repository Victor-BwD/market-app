import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";

import { HttpStatus } from "../../../infra/http/http.status";
import { listProductParser } from "./parser";

import { listProductRepository } from "../../../repository/product/list";

export async function listProductController(req: Request, res: Response) {
  try{
    const params = listProductParser(req);

    const response = await listProductRepository(params);

    return res.status(HttpStatus.OK).json(response);


  }catch(error){
    handleError(error as Error, res);
  }
}