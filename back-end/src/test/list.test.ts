import axios from "axios";


describe("Teste de criação e deleção de produto", () => {
  let list: any;

  test("Deve criar uma lista com sucesso", async () => {
    try{
      const newList = {
        name: "lista 1",
        description: "",
        spending_limit: 1000,
        total_price: 0
      };

      const response = await axios.post("http://localhost:3333/list", newList);
      list = response.data;

      expect(response.status).toBe(201);
      expect(list).toHaveProperty("id");
      expect(list.name).toBe(newList.name);
      expect(list.spending_limit).toBe(newList.spending_limit);
    }catch(e){
      expect(e).toBeInstanceOf(Error);
    }
    
    
  });
  

  afterAll(async () => {
    try{

      const response = await axios.delete(`http://localhost:3333/list/${list.id}`);
      expect(response.status).toBe(200);
    }catch(e){
      expect(e).toBeInstanceOf(Error);
    }
  });
});

describe("Não deve criar uma lista se o nome já existir", () => {
  
});
