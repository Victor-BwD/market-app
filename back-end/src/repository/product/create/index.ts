import { CreateProductPayload } from "../../../controller/product/create/parser";
import { prismaClient } from "../../../lib/prisma/prismaClient";

async function calculateTotalPrice(shoppingListId: number): Promise<number> {
  const products = await prismaClient.product.findMany({
    where: {
      shoppingListId: shoppingListId
    }
  });

  let totalPrice = 0;
  for (const product of products) {
    totalPrice += product.price * product.quantity;
  }

  return totalPrice;
}

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