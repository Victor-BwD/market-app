import { z } from "zod";
import { Request } from "express";


const bodyObject = z.object({
  favorite: z.boolean(),
});

const paramsObject = z.object({
  id: z.number().positive("Id obrigatório"),
});

export function editFavoriteShoppingListParser(req: Request) {
  return bodyObject.parse(req.body);
}

export function editParamsShoppingListParser(req: Request) {
  const id = parseInt(req.params.id);
  
  return paramsObject.parse({id});
}

export type editFavoriteShoppingListParser = z.infer<typeof bodyObject>;
export type editParamsShoppingListParser = z.infer<typeof paramsObject>;
