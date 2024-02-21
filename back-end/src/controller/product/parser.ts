import { Request } from "express";
import { z } from "zod";

const bodyObject = z.object({
  name: z.string().min(3).transform((name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase();
  }),
  description: z.string(),
  price: z.number().min(0).nonnegative("O preço não pode ser negativo.").transform((n) => parseFloat(n.toFixed(2))),
  quantity: z.number().min(0).nonnegative("A quantidade não pode ser negativa."),
  shoppingListId: z.number().int().positive("O id da lista de compras não pode ser negativo."),
  categoryId: z.number().int().positive("O id da categoria não pode ser negativo.").optional(),
});

export function CreateProductParser(req: Request) {
  return bodyObject.parse(req.body);
}
export type CreateProductPayload = z.infer<typeof bodyObject>;
