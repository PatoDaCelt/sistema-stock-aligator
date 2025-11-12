import { useState } from "react";
import useVentas from "../hooks/useVentas";
import type { Venta } from "../types/models.ts";
import VentasTable from "../components/ventas_components/VentasTable.tsx";
import NuevaVentaForm from "../components/ventas_components/NuevaVentaForm";
import DetalleVentaModal from "../components/ventas_components/DetalleVentaModal.tsx";
import loadingBg from "../assets/carrito.svg";

export default function Ventas() {
  const { ventas, fetchVentas, loading, error } = useVentas();
  const [ventaSeleccionada, setVentaSeleccionada] = useState<Venta | null>(
    null
  );

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
          Cargando tabla de ventas...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] text-red-400">
        Error: {error}
      </div>
    );

  return (
    <div className="space-y-6 text-gray-200">
      <NuevaVentaForm onVentaCreada={fetchVentas} />
      <VentasTable ventas={ventas} onSelect={setVentaSeleccionada} />

      {ventaSeleccionada && (
        <DetalleVentaModal
          venta={ventaSeleccionada}
          onClose={() => setVentaSeleccionada(null)}
        />
      )}
    </div>
  );
}
