import { CategorySeeder } from "./category.seed";

async function populateCategoryDataBase() {
  const categorySeeder = new CategorySeeder();
  await categorySeeder.populateDatabase();
}

populateCategoryDataBase().catch((error) => {
  console.error("Erro ao popular o banco de dados:", error);
});