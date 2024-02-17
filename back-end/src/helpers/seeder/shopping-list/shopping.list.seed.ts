import { PrismaClient } from "@prisma/client";


// Use npm run populate to populate the database with the dummy data
class shoppingListSeeder {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async populateDatabase() {
    try {
      const count = await this.prisma.shoppingList.count();
      if (count > 0) return;

      await this.prisma.shoppingList.createMany({
        data: {
          name: "Lista de compras 1",
          description: "Lista de compras para o mês de julho",
          spending_limit: 100.00,
          total_price: 0.00,
        }
      });
    }catch(error) {
      console.error("Erro ao popular o banco de dados:", error);
    }finally {
      await this.prisma.$disconnect();
    }


  }
}

export { shoppingListSeeder };
