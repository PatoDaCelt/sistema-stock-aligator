import { useState } from "react";
import useClientes from "../hooks/useClientes.ts";
import type { Cliente } from "../hooks/useClientes.ts";
import ClientesTable from "../components/clientes_componentes/ClientesTable.tsx";
import ClienteModal from "../components/clientes_componentes/ClienteModal.tsx";
import loadingBg from "../assets/carrito.svg";

export default function Clientes() {
  const {
    clientes,
    loading,
    error,
    createCliente,
    updateCliente,
    deleteCliente,
  } = useClientes();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  if (loading)
    return (
      <div className="relative flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-900 overflow-hidden">
        <img
          src={loadingBg}
          alt="Cargando..."
          className="absolute w-[60%] max-w-[400px] opacity-20 object-contain select-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="animate-pulse text-xl font-semibold text-blue-400">
          Cargando tabla de productos...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] text-red-400">
        Error: {error}
      </div>
    );

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

      <ClientesTable
        clientes={clientes}
        onEdit={handleEdit}
        onDelete={deleteCliente}
      />

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
