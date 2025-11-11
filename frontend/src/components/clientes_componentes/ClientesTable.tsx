import { useState, useMemo } from "react";
import { Edit, Trash2, Search } from "lucide-react";
import type { Cliente } from "../../hooks/useClientes.ts";
import ConfirmationModal from "../productos_components/ConfirmationModal.tsx";

interface Props {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: number) => void;
}

export default function ClientesTable({ clientes, onEdit, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [clienteToDelete, setClienteToDelete] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      clientes.filter((c) =>
        c.nombre.toLowerCase().includes(search.toLowerCase())
      ),
    [clientes, search]
  );

  const clienteInfo = clientes.find((c) => c.id === clienteToDelete);

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* 🔍 Barra superior */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-3 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-700 text-gray-200 px-3 py-2 rounded-md outline-none w-full sm:w-64 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 📋 Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Correo</th>
              <th className="px-4 py-3 text-left">Teléfono</th>
              <th className="px-4 py-3 text-left">Dirección</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition">
                <td className="px-4 py-2">{c.nombre}</td>
                <td className="px-4 py-2">{c.correo}</td>
                <td className="px-4 py-2">{c.telefono || "—"}</td>
                <td className="px-4 py-2">{c.direccion || "—"}</td>
                <td className="px-4 py-2 text-center flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(c)}
                    className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                    title="Editar cliente"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => setClienteToDelete(c.id)}
                    className="p-2 rounded bg-red-600 hover:bg-red-700 text-white transition"
                    title="Eliminar cliente"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No se encontraron clientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      {clienteToDelete !== null && clienteInfo && (
        <ConfirmationModal
          productoNombre={clienteInfo.nombre}
          onConfirm={() => {
            onDelete(clienteToDelete);
            setClienteToDelete(null);
          }}
          onCancel={() => setClienteToDelete(null)}
        />
      )}
    </div>
  );
}
