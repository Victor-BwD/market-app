import { Request } from "express";
import { z } from "zod";

export const listShoppingListParamsSchema  = z.object({
  page: z.string().min(1, "Página obrigatória"),
  pageLimit: z.string().min(1, "Tamanho da página obrigatório"),
});

export function listShoppingListParser(req: Request) {
  return listShoppingListParamsSchema.parse(req.query);
}
export type ListShoppingListParams = z.infer<typeof listShoppingListParamsSchema >;
