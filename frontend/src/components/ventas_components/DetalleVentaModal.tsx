import { X } from "lucide-react";
import type { Venta } from "../../types/models.ts";

interface Props {
  venta: Venta | null;
  onClose: () => void;
}

export default function VentaDetalleModal({ venta, onClose }: Props) {
  if (!venta) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Detalle de venta #{venta.id}
        </h2>

        <p className="text-gray-300 mb-2">
          <strong>Cliente:</strong> {venta.cliente}
        </p>
        <p className="text-gray-300 mb-2">
          <strong>Fecha:</strong>{" "}
          {venta.fecha ? new Date(venta.fecha).toLocaleString() : "—"}
        </p>

        <div className="mt-4 border-t border-gray-700 pt-3">
          <h3 className="text-lg font-semibold mb-2">Productos vendidos</h3>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="text-left py-1">Producto</th>
                <th className="text-center py-1">Cant.</th>
                <th className="text-right py-1">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {venta.detalles?.map((d, idx) => (
                <tr key={idx} className="border-b border-gray-700/50">
                  <td className="py-1">{d.producto || "—"}</td>
                  <td className="text-center py-1">{d.cantidad}</td>
                  <td className="text-right py-1">
                    ${Number(d.subtotal || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mt-4">
            <span className="font-semibold text-lg">
              Total: ${Number(venta.total || 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
