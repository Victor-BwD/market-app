import { ListProductSchema } from "../../../controller/product/list/parser";
import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function listProductRepository({id}: ListProductSchema) {
  const products = await prismaClient.product.findMany({
    where: {
      shoppingListId: id
    }
  });

  return products;
}