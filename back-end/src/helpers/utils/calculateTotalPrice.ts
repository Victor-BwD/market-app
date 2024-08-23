import { prismaClient } from "../../lib/prisma/prismaClient";

export async function calculateTotalPrice(shoppingListId: number): Promise<number> {
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