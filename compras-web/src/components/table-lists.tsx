/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

import { api } from "../services/api";
import { format } from "date-fns";
import handleRequestError from "../services/handleRequestError";
import { toast } from "react-toastify";
import { ModalCadastroProduto } from "./modal-cadastro-item";
import { ProductsModal } from "./list-products-modal";

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
  const [shoppingList, setShoppingList] = useState<ShoppingListProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenProduct, setIsModalOpenProduct] = useState<boolean>(false);
  const pageLimit = 4;

  useEffect(() => {
    loadShoppingList();
  }, [currentPage]);

  function formatDate(dataString: string): string {
    const data = new Date(dataString);
    return format(data, "dd/MM/yyyy");
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

  const handleOpenModal = (id: string) => {
    setSelectedListId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedListId(null);
  };

  const handleOpenProductsModal = (id: string) => {
    setSelectedListId(id);
    setIsModalOpenProduct(true);
  };

  const handleCloseProductsModal = () => {
    setIsModalOpenProduct(false);
  };

  return (
    <div className="p-4 bg-white w-[1000px] h-[390px] text-black rounded-md">
      <h1 className="text-3xl font-semibold mb-4 text-black flex justify-center items-center">
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
                <td
                  className={
                    list.total_price > list.spending_limit
                      ? "border px-4 py-2 bg-red-400"
                      : "border px-4 py-2 bg-green-400"
                  }
                >
                  R$ {list.total_price.toFixed(2)}
                </td>
                <td className="border px-4 py-2 space-x-6 flex items-center justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                    onClick={() => handleOpenModal(list.id)}
                  >
                    Inserir produtos
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                    onClick={() => handleOpenProductsModal(list.id)}
                  >
                    Visualizar
                  </button>
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                  >
                    Excluir
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
          className={`bg-${
            currentPage === 1 ? "gray" : "blue"
          }-500 text-white px-4 py-2 rounded`}
        >
          Página Anterior
        </button>
        {shoppingList.length > 0 && (
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`bg-${
              currentPage === totalPages ? "gray" : "blue"
            }-500 text-white px-4 py-2 rounded`}
          >
            Próxima Página
          </button>
        )}
      </div>
      {isModalOpen && (
        <ModalCadastroProduto
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          shoppingListId={selectedListId as string}
        />
      )}

      {isModalOpenProduct && (
        <ProductsModal
          isOpen={isModalOpenProduct}
          onClose={handleCloseProductsModal}
          shoppingListId={selectedListId as string}
        />
      )}
    </div>
  );
}
