import { CreateProductPayload } from "../../../controller/product/parser";
import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function CreateProductRepository(payload: CreateProductPayload) {
  const product = await prismaClient.product.create({
    data: payload
  });

  return product;
}