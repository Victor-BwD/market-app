import { z } from "zod";
import { Request } from "express";
import { getByName } from "../../../repository/shopping-list/list";
import { isEmpty } from "radash";


const bodyObject = z.object({
  name: z.string().min(3),
  description: z.string(),
  spending_limit: z.number().min(0).nonnegative("O limite de gastos não pode ser negativo.").transform((n) => parseFloat(n.toFixed(2))),
  total_price: z.number().min(0).nonnegative("O preço total não pode ser negativo.").transform((n) => parseFloat(n.toFixed(2))),
});

export async function CreateShoppingListParser(req: Request) {
  const parsedBody = bodyObject.parse(req.body);

  const existingList = await getByName(parsedBody.name);

  if(!isEmpty(existingList)){
    throw new Error("Já existe uma lista com esse nome.");
  }

  return parsedBody;
}
export type CreateShoppingListPayload = z.infer<typeof bodyObject>;
