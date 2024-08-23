import { CreateProductPayload } from "../../../controller/product/create/parser";
import { calculateTotalPrice } from "../../../helpers/utils/calculateTotalPrice";
import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function CreateProductRepository(payload: CreateProductPayload) {
  const product = await prismaClient.product.create({
    data: payload
  });

  const shoppingListId = payload.shoppingListId;
  if (shoppingListId) {
    const total_price = await calculateTotalPrice(shoppingListId);
    await prismaClient.shoppingList.update({
      where: { id: shoppingListId },
      data: { total_price: total_price }
    });
  }

  return product;
}