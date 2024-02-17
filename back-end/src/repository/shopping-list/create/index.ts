import { CreateShoppingListPayload } from "../../../controller/shopping-list/parser";
import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function CreateShoppingListRepository(payload: CreateShoppingListPayload) {
  const shoppingList = await prismaClient.shoppingList.create({
    data: payload
  });
  
  return shoppingList;
}