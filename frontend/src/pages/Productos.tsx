import { useState } from "react";
import useProductos from "../hooks/useProductos.ts";
import type { Producto } from "../hooks/useProductos.ts";
import ProductosTable from "../components/productos_components/ProductosTable.tsx";
import ProductoForm from "../components/productos_components/ProductosForm.tsx";

export default function Productos() {
  const { productos, loading, error, createProducto, updateProducto, deleteProducto } = useProductos();
  const [editing, setEditing] = useState<Producto | null>(null);

  if (loading) return <div className="text-gray-400">Cargando productos...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventario de Productos</h1>
        <button
          onClick={() => setEditing({ id: 0, nombre: "", categoria: "", precio: 0, stock: 0 })}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          + Nuevo Producto
        </button>
      </div>

      <ProductosTable
        productos={productos}
        onEdit={(p) => setEditing(p)}
        onDelete={(id) => deleteProducto(id)}
      />

      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-3 text-gray-100">
              {editing.id ? "Editar producto" : "Nuevo producto"}
            </h2>
            <ProductoForm
              initialData={editing.id ? editing : null}
              onSubmit={(data) => {
                if (editing.id) updateProducto(editing.id, data);
                else createProducto(data);
                setEditing(null);
              }}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}