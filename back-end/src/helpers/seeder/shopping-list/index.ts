import { shoppingListSeeder } from "./shopping.list.seed";


async function populateShoppingListDataBase() {
  const shoppingListSeed = new shoppingListSeeder();
  await shoppingListSeed.populateDatabase();
}

populateShoppingListDataBase().catch((error) => {
  console.error("Erro ao popular o banco de dados:", error);
});