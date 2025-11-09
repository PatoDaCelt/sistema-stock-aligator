import { useState, useMemo } from "react";
import { Edit, Trash2, Search, SortAsc } from "lucide-react";
import type { Producto } from "../../hooks/useProductos.ts";
import ConfirmationModal from "./ConfirmationModal.tsx";

interface Props {
  productos: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
}

export default function ProductosTable({ productos, onEdit, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("nombre_asc");
  //Estado para guardar el ID del producto a eliminar
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  //Se llama al clickear Eliminar
  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
  };

  //Se llama si se confirma la eliminacion
  const handleConfirmDelete = () => {
    if (productToDelete !== null) {
      onDelete(productToDelete);
    }
    setProductToDelete(null);
  };

  //Cancela y cierra el modal
  const handleCancelDelete = () => {
    setProductToDelete(null);
  };

  //Encuentra el producto y obtiene el nombre
  const productInfo = productos.find((p) => p.id === productToDelete);

  //Filtro y ordenamiento de los productos
  const filteredAndSorted = useMemo(() => {
    const result = productos.filter((p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase())
    );

    switch (sortOption) {
      case "nombre_asc":
        result.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case "precio_asc":
        result.sort((a, b) => a.precio - b.precio);
        break;
      case "precio_desc":
        result.sort((a, b) => b.precio - a.precio);
        break;
      case "stock_asc":
        result.sort((a, b) => a.stock - b.stock);
        break;
      case "stock_desc":
        result.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    return result;
  }, [productos, search, sortOption]);

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Barra de búsqueda y ordenamiento */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-3 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-700 text-gray-200 px-3 py-2 rounded-md outline-none w-full sm:w-64 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <SortAsc className="text-gray-400" size={18} />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-gray-700 text-gray-200 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="nombre_asc">Orden alfabético (A–Z)</option>
            <option value="precio_asc">Precio: menor a mayor</option>
            <option value="precio_desc">Precio: mayor a menor</option>
            <option value="stock_asc">Stock: menor a mayor</option>
            <option value="stock_desc">Stock: mayor a menor</option>
          </select>
        </div>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Categoría</th>
              <th className="px-4 py-3 text-right">Precio</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-right">Stock Mínimo</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredAndSorted.map((p) => {
              const isLowStock = p.stock < p.stock_minimo;

              return (
                <tr
                  key={p.id}
                  className={`border-b border-gray-700 transition ${
                    isLowStock
                      ? "bg-yellow-500/10 hover:bg-yellow-500/20"
                      : "hover:bg-gray-700/50"
                  }`}
                >
                  <td className="px-4 py-2">{p.nombre}</td>
                  <td className="px-4 py-2">{p.categoria}</td>
                  <td className="px-4 py-2 text-right">
                    ${Number(p.precio || 0).toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-2 font-semibold text-right ${
                      isLowStock ? "text-yellow-400" : ""
                    }`}
                  >
                    {p.stock}
                  </td>
                  <td className="px-4 py-2 text-right">{p.stock_minimo}</td>

                  <td className="px-4 py-2 text-center flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(p)}
                      className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                      title="Editar producto"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(p.id)}
                      className="p-2 rounded bg-red-600 hover:bg-red-700 text-white transition"
                      title="Eliminar producto"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredAndSorted.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No se encontraron productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      {productToDelete !== null && productInfo && (
        <ConfirmationModal
          productoNombre={productInfo.nombre}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
