import { useState } from "react";
import type { Producto } from "../../hooks/useProductos.ts";

interface Props {
  onSubmit: (data: Omit<Producto, "id">) => void;
  initialData?: Producto | null;
  onCancel?: () => void;
}

export default function ProductoForm({
  onSubmit,
  initialData,
  onCancel,
}: Props) {
  const [form, setForm] = useState<Omit<Producto, "id">>({
    nombre: initialData?.nombre || "",
    categoria: initialData?.categoria || "",
    precio: initialData?.precio || NaN,
    stock: initialData?.stock || NaN,
    stock_minimo: initialData?.stock_minimo || NaN,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "precio" || name.includes("stock") ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.nombre.trim() ||
      !form.categoria.trim() ||
      form.precio <= 0 ||
      form.stock < 0 ||
      form.stock_minimo < 0
    ) {
      alert(
        "ALERTA!!! Completa todos los campos correctamente antes de continuar"
      );
      return;
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-gray-300">
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre del producto"
        className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none"
      />
      <input
        type="text"
        name="categoria"
        value={form.categoria}
        onChange={handleChange}
        placeholder="Categoría"
        className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none"
      />
      <input
        type="number"
        name="precio"
        value={form.precio}
        onChange={handleChange}
        placeholder="Precio"
        className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none"
      />
      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none"
      />
      <input
        type="number"
        name="stock_minimo"
        value={form.stock_minimo}
        onChange={handleChange}
        placeholder="Stock Mínimo"
        className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none"
      />
      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition-colors"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          {initialData ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
