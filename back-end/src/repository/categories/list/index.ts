import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function listCategoriesRepository() {
  const response = await prismaClient.category.findMany({
    select: {
      id: true,
      name: true,
      description: true
    }
  });

  return response;
}