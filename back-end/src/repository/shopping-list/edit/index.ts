import { editBodyShoppingListParser, editParamsShoppingListParser } from "../../../controller/shopping-list/edit/parser";
import { editFavoriteShoppingListParser } from "../../../controller/shopping-list/editFavorite/parser";
import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function editShoppingListRepository(id: editParamsShoppingListParser, payload: editBodyShoppingListParser) {
  const shoppingList = await prismaClient.shoppingList.update({
    where: id,
    data: payload
  });
    
  return shoppingList;
}

export async function editFavoriteShoppingListRepository(id: editParamsShoppingListParser, payload: editFavoriteShoppingListParser) {
  const shoppingList = await prismaClient.shoppingList.update({
    where: id,
    data: payload
  });
    
  return shoppingList;
}