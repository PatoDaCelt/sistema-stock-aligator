import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { VentaMes } from "../../types/models.ts";

interface Props { ventas_por_mes: VentaMes[]; }

const SalesChart = ({ ventas_por_mes }: Props) => {
  //Espera objetos el mes y el total
  const data = ventas_por_mes.map(v => ({ mes: v.mes, ventas: v.total }));

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg text-white w-full h-80">
      <h3 className="text-lg font-semibold mb-4">Ventas por mes</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="mes" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
              color: "#fff",
            }}
          />
          <Bar dataKey="ventas" fill="#3b82f6" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
