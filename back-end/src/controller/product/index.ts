import handleError from "../../helpers/handle-errors/handle.error";
import { HttpStatus } from "../../infra/http/http.status";
import { CreateProductRepository } from "../../repository/product/create";
import { CreateProductParser } from "./parser";
import { Request, Response } from "express";

export async function CreateProductController(req: Request, res: Response) {
  try{
    const productDTO = CreateProductParser(req);
    const product = await CreateProductRepository(productDTO);

    return res.status(HttpStatus.CREATED).json(product);
  }catch(error){
    handleError(error as Error, res);
  }
}