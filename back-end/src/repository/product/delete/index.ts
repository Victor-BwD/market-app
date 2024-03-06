import { DeleteProductParams } from "../../../controller/product/delete/parser";

import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function deleteProductRepository({id}: DeleteProductParams) {
  const response = await prismaClient.product.delete({
    where: {
      id
    }
  });

  return response;
}