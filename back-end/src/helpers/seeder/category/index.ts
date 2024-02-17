import { CategoriaSeeder } from "./category.seed";

async function populateCategoryDataBase() {
  const categorySeeder = new CategoriaSeeder();
  await categorySeeder.populateDatabase();
}

populateCategoryDataBase().catch((error) => {
  console.error("Erro ao popular o banco de dados:", error);
});