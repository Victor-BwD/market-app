import React, { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    loadShoppingList();
  }, [currentPage]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const loadShoppingList = async () => {
    const response = await axios.get(
      `http://localhost:3333/list?page=${currentPage}&pageLimit=10`
    );

    console.log(response.headers);

    const totalCountHeader = await response.headers["x-total-count"];

    // Converta o total count em um número inteiro
    const totalCount = parseInt(totalCountHeader, 10);

    // Atualize o estado com o total count
    setTotalCount(totalCount);
    console.log(totalCount);

    // Calcula o total de páginas
    const totalPages = Math.ceil(totalCount / 10);
    setTotalPages(totalPages);

    // Atualize o estado com a lista de compras
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
      await axios.delete(`http://localhost:3333/list/${id}`);
      loadShoppingList();
    } catch (error: any) {
      console.error(error.response);
    }
  };

  return (
    <div className="p-4 bg-white w-[1000px] text-black rounded-md">
      <h1 className="text-3xl font-semibold mb-4 text-black">
        Lista de Compras
      </h1>
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Lista
            </th>
            <th scope="col" className="px-6 py-4">
              Criado em
            </th>
            <th scope="col" className="px-6 py-4">
              Total para gastar
            </th>
            <th scope="col" className="px-6 py-4">
              Total
            </th>
            <th scope="col" className="px-6 py-4">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {shoppingList.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                Não há itens na lista
              </td>
            </tr>
          ) : (
            shoppingList.map((list: ShoppingListProps, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4">{list.name}</td>
                <td className="px-6 py-4">{list.createdAt}</td>
                <td className="px-6 py-4">{list.spending_limit}</td>
                <td className="px-6 py-4">{list.total_price}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(list.id)}>Excluir</button>
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
