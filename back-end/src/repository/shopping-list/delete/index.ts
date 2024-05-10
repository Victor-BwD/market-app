import { DeleteShoppingListParams } from "../../../controller/shopping-list/delete/parser";
import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function deleteShoppingListRepository({id}: DeleteShoppingListParams) {
  const productsToDelete = await prismaClient.product.findMany({
    where: {
      shoppingListId: id
    }
  });

  await Promise.all(productsToDelete.map(async (product) => {
    await prismaClient.product.delete({
      where: {
        id: product.id
      }
    });
  }));

  const response = await prismaClient.shoppingList.delete({
    where: {
      id
    }
  });

  return response;
}