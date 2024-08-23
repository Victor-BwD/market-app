import { DeleteProductParams } from "../../../controller/product/delete/parser";
import { calculateTotalPrice } from "../../../helpers/utils/calculateTotalPrice";

import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function deleteProductRepository({id}: DeleteProductParams) {
  const response = await prismaClient.product.delete({
    where: {
      id
    }
  });

  const shoppingListId = response.shoppingListId;

  if (shoppingListId) {
    const total_price = await calculateTotalPrice(shoppingListId);
    await prismaClient.shoppingList.update({
      where: { id: shoppingListId },
      data: { total_price: total_price }
    });
  }

  return response;
}