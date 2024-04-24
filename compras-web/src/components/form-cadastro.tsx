/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";
import { Table } from "./table-lists";
import { toast } from "react-toastify";

export function FormCadastro() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    spending_limit: 0,
    total_price: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "spending_limit" ? parseFloat(value) : value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3333/list",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setFormData({
        name: "",
        description: "",
        spending_limit: 0,
        total_price: 0,
      });

      toast.success("Lista cadastrada com sucesso!");
    } catch (error: any) {
      console.error(error.response);
    }
  };

  return (
    <div className="flex flex-start flex-row justify-center items-center h-screen mx-[100px] gap-5 ml-12">
      <form className="bg-white rounded-lg p-8" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Detalhes:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="limit" className="block text-gray-700 font-bold mb-2">
            Limite para Gastar:
          </label>
          <input
            type="number"
            id="limit"
            name="spending_limit"
            value={formData.spending_limit}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cadastrar
        </button>
      </form>
      <Table />
    </div>
  );
}
