import handleError from "../../../helpers/handle-errors/handle.error";

import { Request, Response } from "express";
import { HttpStatus } from "../../../infra/http/http.status";
import { listCategoriesRepository } from "../../../repository/categories/list";

export async function listCategoriesController(req: Request, res: Response) {
  try {
    const categoriesList = await listCategoriesRepository();

    return res.status(HttpStatus.OK).json(categoriesList);
  } catch (error) {
    handleError(error as Error, res);
  }
}
