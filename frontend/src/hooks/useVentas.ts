import { useState, useEffect } from "react";
import axios from "axios";
import type { Venta, NuevaVentaData } from "../types/models.ts";

export default function useVentas() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVentas = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/ventas/");
      //Datos recibidos del back
      console.log("DATA Ventas:", res.data);
      setVentas(res.data);
      setError(null);
    } catch {
      setError("Error cargando ventas");
    } finally {
      setLoading(false);
    }
  };

  const crearVenta = async (ventaData: NuevaVentaData) => {
    const res = await axios.post("http://localhost:8000/api/ventas/", ventaData);
    await fetchVentas();
    return res.data;
  };

  const eliminarVenta = async (id: number) => {
    await axios.delete(`http://localhost:8000/api/ventas/${id}/`);
    fetchVentas();
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  return {
    ventas,
    loading,
    error,
    crearVenta,
    eliminarVenta,
    fetchVentas,
  };
}
