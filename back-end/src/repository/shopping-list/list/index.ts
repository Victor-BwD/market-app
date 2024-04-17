
import { ListShoppingListParams } from "../../../controller/shopping-list/list/parser";
import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function listShoppingListRepository({page, pageLimit}: ListShoppingListParams) {
  
  const offset = (parseInt(page) - 1) * parseInt(pageLimit);
  const response = await prismaClient.shoppingList.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      spending_limit: true,
      total_price: true,
      favorite: true,
      createdAt: true,
      products: {
        select: {
          name: true,
          price: true,
          quantity: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    skip: offset,
    take: parseInt(pageLimit)
  });

  return response;
}

export async function getByName(name: string) {
  const response = await prismaClient.shoppingList.findFirst({
    where: {
      name: name
    }
  });

  return response;
}

export async function getTotal() {
  const response = await prismaClient.shoppingList.count();

  return response;
}