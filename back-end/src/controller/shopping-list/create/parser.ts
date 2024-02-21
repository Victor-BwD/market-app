import { z } from "zod";
import { Request } from "express";


const bodyObject = z.object({
  name: z.string().min(3),
  description: z.string(),
  spending_limit: z.number().min(0).nonnegative("O limite de gastos não pode ser negativo.").transform((n) => parseFloat(n.toFixed(2))),
  total_price: z.number().min(0).nonnegative("O preço total não pode ser negativo.").transform((n) => parseFloat(n.toFixed(2))),
});

export function CreateShoppingListParser(req: Request) {
  return bodyObject.parse(req.body);
}
export type CreateShoppingListPayload = z.infer<typeof bodyObject>;
