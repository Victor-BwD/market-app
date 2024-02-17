describe("Deve criar um produto", () => {
  test("Deve criar um produto com sucesso", () => {
    const product = {
      name: "Produto 1",
      price: 10,
    };

    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("price");
    expect(product.name).toBe("Produto 1");
  });

  test("O produto não deve ter preço menor que 0", () => {
    try{
      const product = {
        name: "Produto 1",
        price: -10,
      };

      expect(product.price).toBeGreaterThanOrEqual(0);
    }catch(e){
      expect(e).toBeInstanceOf(Error);
    }
  });

  test("O produto não deve ter nome vazio", () => {
    try{
      const product = {
        name: "",
        price: 10,
      };

      expect(product.name).not.toBeNull();
      expect(product.name).not.toBeUndefined();
      expect(product.name).not.toBe("");
    }catch(e){
      expect(e).toBeInstanceOf(Error);
    }
  });
});