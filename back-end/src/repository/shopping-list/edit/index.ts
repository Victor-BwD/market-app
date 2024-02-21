import { editBodyShoppingListParser, editParamsShoppingListParser } from "../../../controller/shopping-list/edit/parser";
import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function editShoppingListRepository(id: editParamsShoppingListParser, payload: editBodyShoppingListParser) {
  const shoppingList = await prismaClient.shoppingList.update({
    where: id,
    data: payload
  });
    
  return shoppingList;
}