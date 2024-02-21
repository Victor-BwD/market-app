import { z } from "zod";
import { Request } from "express";


const bodyObject = z.object({
  name: z.string().min(3),
  description: z.string(),
  spending_limit: z.number().min(0).nonnegative("O limite de gastos não pode ser negativo.").transform((n) => parseFloat(n.toFixed(2))),
});

const paramsObject = z.object({
  id: z.number().positive("Id obrigatório"),
});

export function editBodyShoppingListParser(req: Request) {
  return bodyObject.parse(req.body);
}

export function editParamsShoppingListParser(req: Request) {
  const id = parseInt(req.params.id);
  
  return paramsObject.parse({id});
}

export type editBodyShoppingListParser = z.infer<typeof bodyObject>;
export type editParamsShoppingListParser = z.infer<typeof paramsObject>;
