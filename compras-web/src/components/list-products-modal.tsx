import { useEffect, useState } from "react";
import { api } from "../services/api";
import handleRequestError from "../services/handleRequestError";

interface ProductsInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
}

export function ProductsModal({
  isOpen,
  onClose,
  shoppingListId,
}: {
  isOpen: boolean;
  onClose: () => void;
  shoppingListId: string;
}) {
  const [products, setProducts] = useState<ProductsInterface[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get(`/product/${shoppingListId}`);
      setProducts(response.data);
    } catch (error) {
      handleRequestError(error as never);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
        <button
          className="self-end text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Fechar
        </button>
        <h2 className="text-2xl font-bold mb-4">Lista de produtos</h2>
        <table>
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Produto</th>
              <th className="px-4 py-2 text-left">Descrição</th>
              <th className="px-4 py-2 text-left">Preço</th>
              <th className="px-4 py-2 text-left">Quantidade</th>
            </tr>
          </thead>
          <tbody className="">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">R$ {product.price}</td>
                <td className="px-12 py-2">{product.quantity}</td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Não há itens na lista
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
