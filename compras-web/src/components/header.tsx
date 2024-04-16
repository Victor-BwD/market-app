import React from "react";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-800 p-4">
      <h1 className="text-white text-lg font-bold">my app</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Inicio
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Listas de Compras
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
