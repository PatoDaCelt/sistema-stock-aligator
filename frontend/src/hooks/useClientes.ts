import { useState, useEffect } from "react";
import axios from "axios";

export interface Cliente {
  id: number;
  nombre: string;
  correo: string;
  telefono?: string;
  direccion?: string;
  fecha_registro: string;
}

const API_URL = "http://localhost:8000/api/clientes/";

export default function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  async function fetchClientes() {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setClientes(res.data);
    } catch {
      setError("Error al cargar los clientes");
    } finally {
      setLoading(false);
    }
  }

  async function createCliente(
    cliente: Omit<Cliente, "id" | "fecha_registro">
  ) {
    const res = await axios.post(API_URL, cliente);
    setClientes((prev) => [...prev, res.data]);
  }

  async function updateCliente(id: number, cliente: Partial<Cliente>) {
    const res = await axios.put(`${API_URL}${id}/`, cliente);
    setClientes((prev) => prev.map((c) => (c.id === id ? res.data : c)));
  }

  async function deleteCliente(id: number) {
    await axios.delete(`${API_URL}${id}/`);
    setClientes((prev) => prev.filter((c) => c.id !== id));
  }

  return {
    clientes,
    loading,
    error,
    createCliente,
    updateCliente,
    deleteCliente,
  };
}
