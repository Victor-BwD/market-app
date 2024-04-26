import { useEffect, useState } from "react";

import { api } from "../services/api";
import { format } from "date-fns";
import handleRequestError from "../services/handleRequestError";
import { toast } from "react-toastify";

interface ShoppingListProps {
  id: string;
  name: string;
  description: string;
  spending_limit: number;
  total_price: number;
  favorite: boolean;
  createdAt: string;
}

export function Table() {
  const [inputValue, setInputValue] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingListProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const pageLimit = 4;

  useEffect(() => {
    loadShoppingList();
  }, [currentPage]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  function formatDate(dataString: string): string {
    const data = new Date(dataString);
    return format(data, "dd-MM-yyyy");
  }

  const loadShoppingList = async () => {
    const response = await api.get(
      `/list?page=${currentPage}&pageLimit=${pageLimit}`
    );

    const totalCountHeader = await response.headers["x-total-count"];
    const totalCount = parseInt(totalCountHeader, 10);
    setTotalCount(totalCount);

    const totalPages = Math.ceil(totalCount / pageLimit);
    setTotalPages(totalPages);

    setShoppingList(response.data);
  };
  const nextPage = () => {
    console.log(currentPage, totalPages);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/list/${id}`).then(() => {
        setShoppingList(shoppingList.filter((list) => list.id !== id));

        toast.success("Lista excluída com sucesso!");
        loadShoppingList();
      });
    } catch (error) {
      handleRequestError(error as never);
    }
  };

  return (
    <div className="p-4 bg-white w-[1000px] h-[390px] text-black rounded-md">
      <h1 className="text-3xl font-semibold mb-4 text-black">
        Lista de Compras
      </h1>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Lista</th>
            <th className="px-4 py-2">Criado em</th>
            <th className="px-4 py-2">Total para gastar R$</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {shoppingList.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                Não há itens na lista
              </td>
            </tr>
          ) : (
            shoppingList.map((list, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border px-4 py-2">{list.name}</td>
                <td className="border px-4 py-2">
                  {formatDate(list.createdAt)}
                </td>
                <td className="border px-4 py-2">R$ {list.spending_limit}</td>
                <td className="border px-4 py-2">R$ {list.total_price}</td>
                <td className="border px-4 py-2 space-x-6 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                  >
                    Excluir
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
                    Inserir itens +
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Página Anterior
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Próxima Página
        </button>
      </div>
    </div>
  );
}
