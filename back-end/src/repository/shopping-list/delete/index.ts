import { DeleteShoppingListParams } from "../../../controller/shopping-list/delete/parser";
import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function deleteShoppingListRepository({id}: DeleteShoppingListParams) {
  const response = await prismaClient.shoppingList.delete({
    where: {
      id
    }
  });

  return response;
}