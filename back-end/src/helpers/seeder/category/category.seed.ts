import { PrismaClient } from "@prisma/client";
import categoriasJson from "../../../config/constants/dummy/categoria.json";

// Use npm run populate to populate the database with the dummy data
class CategorySeeder {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async populateDatabase() {
    try {
      const count = await this.prisma.category.count();
      if (count > 0) return;

      await this.prisma.category.createMany({
        data: categoriasJson
      });

      console.log("Categorias populadas com sucesso!");
    } catch (error) {
      console.error("Erro ao popular o banco de dados:", error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

export { CategorySeeder };
