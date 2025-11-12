import type { Venta } from "../../types/models.ts";

interface Props {
  ventas: Venta[];
  onSelect: (venta: Venta) => void;
}

export default function VentasTable({ ventas,onSelect }: Props) {
  return (
    <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
      <table className="min-w-full text-sm text-gray-300">
        <thead className="bg-gray-700 text-gray-200">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Cliente</th>
            <th className="px-4 py-3 text-left">Fecha</th>
            <th className="px-4 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v) => (
            <tr
              key={v.id}
              className="border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer transition"
              onClick={() => onSelect(v)}
            >
              <td className="px-4 py-2">
                {v.cliente || "Sin id cliente"}
              </td>
              <td className="px-4 py-2">
                {v.cliente_nombre || "Sin cliente"}
              </td>
              <td className="px-4 py-2">
                {v.fecha ? new Date(v.fecha).toLocaleString() : "—"}
              </td>
              <td className="px-4 py-2 text-right">
                ${Number(v.total || 0).toFixed(2)}
              </td>
            </tr>
          ))}
          {ventas.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-6 text-gray-400">
                No hay ventas registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
