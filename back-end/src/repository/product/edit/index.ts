import { editParamsProductParser, editProductParser } from "../../../controller/product/edit/parser";
import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function editProductRepository(id: editParamsProductParser, payload: editProductParser) {
  const response = await prismaClient.product.update({
    where: {
      id: id.id
    },
    data: {
      name: payload.name,
      description: payload.description,
      quantity: payload.quantity,
      price: payload.price,
      categoryId: payload.categoryId
    }
  });

  return response;
  
}