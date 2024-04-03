import handleError from "../../../helpers/handle-errors/handle.error";
import { ResponseDTO } from "../../../helpers/utils/responseDTO";
import { HttpStatus } from "../../../infra/http/http.status";
import { CreateProductRepository } from "../../../repository/product/create";
import { CreateProductParser } from "./parser";
import { Request, Response } from "express";

export async function CreateProductController(req: Request, res: Response) {
  try{
    const productDTO = CreateProductParser(req);
    const product = await CreateProductRepository(productDTO);

    const responseDTO = new ResponseDTO(HttpStatus.CREATED, "Product created successfully", product);

    return res.status(HttpStatus.CREATED).json(responseDTO);
  }catch(error){
    handleError(error as Error, res);
  }
}