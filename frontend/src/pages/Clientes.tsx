import { useState } from "react";
import useClientes from "../hooks/useClientes.ts";
import type { Cliente } from "../hooks/useClientes.ts";
import ClientesTable from "../components/clientes_componentes/ClientesTable.tsx";
import ClienteModal from "../components/clientes_componentes/ClienteModal.tsx";

export default function Clientes() {
  const { clientes, loading, error, createCliente, updateCliente, deleteCliente } = useClientes();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  if (loading) return <div className="text-gray-300">Cargando clientes...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  const handleAdd = () => {
    setEditingCliente(null);
    setModalOpen(true);
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setModalOpen(true);
  };

  const handleSave = async (data: Omit<Cliente, "id" | "fecha_registro">) => {
    if (editingCliente) {
      await updateCliente(editingCliente.id, data);
    } else {
      await createCliente(data);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Clientes</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          + Nuevo Cliente
        </button>
      </div>

      <ClientesTable clientes={clientes} onEdit={handleEdit} onDelete={deleteCliente} />

      {modalOpen && (
        <ClienteModal
          cliente={editingCliente}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}