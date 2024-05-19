import { useEffect, useState } from "react";
import { api } from "../services/api";
import handleRequestError from "../services/handleRequestError";

interface CategoryInterface {
  id: number;
  name: string;
}

interface FormDataProps {
  name: string;
  description: string;
  price: number;
  quantity: number;
  shoppingListId: string | null;
  categoryId: number;
}

export function ModalCadastroProduto({
  isOpen,
  onClose,
  shoppingListId,
}: {
  isOpen: boolean;
  onClose: () => void;
  shoppingListId: string;
}) {
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    shoppingListId: shoppingListId,
    categoryId: 1,
  });

  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await api.get("/categories");
    setCategories(response.data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const parsedValue =
      name === "price" || name === "quantity" || name === "categoryId"
        ? parseFloat(value)
        : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await api.post("/product", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setFormData({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        shoppingListId: shoppingListId,
        categoryId: 1,
      });

      window.location.reload();
    } catch (error: any) {
      console.log(formData.categoryId);
      handleRequestError(error);
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
        <h2 className="text-2xl font-bold mb-4">Cadastrar Produto</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nome:
            </label>
            <input
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Descrição:
            </label>
            <input
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Preço:
            </label>
            <input
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Quantidade:
            </label>
            <input
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              name="quantity"
              value={formData.quantity}
              type="number"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label>
              Categoria:
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
