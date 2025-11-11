import { useState, useEffect } from "react";
import type { Cliente } from "../../hooks/useClientes.ts";

interface Props {
  cliente?: Cliente | null;
  onSave: (data: Omit<Cliente, "id" | "fecha_registro">) => void;
  onClose: () => void;
}

export default function ClienteModal({ cliente, onSave, onClose }: Props) {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
  });

  useEffect(() => {
    if (cliente) {
      setForm({
        nombre: cliente.nombre,
        correo: cliente.correo,
        telefono: cliente.telefono || "",
        direccion: cliente.direccion || "",
      });
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">
          {cliente ? "Editar Cliente" : "Nuevo Cliente"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-gray-200 px-3 py-2 rounded-md"
          />
          <input
            name="correo"
            placeholder="Correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-gray-200 px-3 py-2 rounded-md"
          />
          <input
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full bg-gray-700 text-gray-200 px-3 py-2 rounded-md"
          />
          <textarea
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
            className="w-full bg-gray-700 text-gray-200 px-3 py-2 rounded-md"
          />
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}