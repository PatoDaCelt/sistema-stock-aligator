import { useState } from "react";
import useVentas from "../hooks/useVentas";
import type { Venta } from "../types/models.ts";
import VentasTable from "../components/ventas_components/VentasTable.tsx";
import NuevaVentaForm from "../components/ventas_components/NuevaVentaForm";
import DetalleVentaModal from "../components/ventas_components/DetalleVentaModal.tsx";

export default function Ventas() {
  const { ventas, fetchVentas } = useVentas();
  const [ventaSeleccionada, setVentaSeleccionada] = useState<Venta | null>(null);

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