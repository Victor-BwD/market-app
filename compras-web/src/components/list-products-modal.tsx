import { useEffect, useState } from "react";
import { api } from "../services/api";
import handleRequestError from "../services/handleRequestError";

export function ProductsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get("/list");
      setProducts(response.data);
    } catch (error) {
      handleRequestError(error as never);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col">
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
              <th>Produto</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Arroz</td>
              <td>R$ 5,00</td>
              <td>2</td>
              <td>R$ 10,00</td>
            </tr>
            <tr>
              <td>Feijão</td>
              <td>R$ 4,00</td>
              <td>1</td>
              <td>R$ 4,00</td>
            </tr>
            <tr>
              <td>Carne</td>
              <td>R$ 20,00</td>
              <td>1</td>
              <td>R$ 20,00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
