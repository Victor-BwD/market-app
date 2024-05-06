import { useEffect, useState } from "react";
import { api } from "../services/api";

interface CategoryInterface {
  id: number;
  name: string;
}

interface FormDataProps {
  name: string;
  description: string;
  price: number;
  quantity: number;
  shoppingListId: string;
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
    const response = await api.get("/category");
    setCategories(response.data);
  };
}
