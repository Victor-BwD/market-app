import { Request } from "express";
import { z } from "zod";

const deleteShoppingListParamsSchema  = z.object({
  id: z.number().positive("Id obrigatório"),
});

export function deleteShoppingListParser(req: Request) {
  const id = parseInt(req.params.id);
  
  return deleteShoppingListParamsSchema.parse({id});
}
export type DeleteShoppingListParams = z.infer<typeof deleteShoppingListParamsSchema>;
