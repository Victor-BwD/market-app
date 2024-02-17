import { HttpStatus } from "../../infra/http/http.status";
import { Response } from "express";
import NotFound from "../type-errors/not.found.error";
import BadRequest from "../type-errors/bad.request.error";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

async function handleError(error: Error, res: Response) {
  if (error instanceof ZodError) {
    return res.status(HttpStatus.NOT_ACCEPTABLE).json({
      message: `Erro na validação dos seguintes campos: ${error.issues.map(issue => issue.path[0]).join(", ")}`
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return res.status(HttpStatus.NOT_FOUND).send({ message: "Entidade não encontrada." });
    }
  }

  if (error instanceof NotFound) {
    return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
  }

  if (error instanceof BadRequest) {
    return res.status(HttpStatus.BAD_REQUEST).send({ message: error.message });
  }

  return res.status(HttpStatus.UNAUTHORIZED).send({ message: error.message });
}

export default handleError;
