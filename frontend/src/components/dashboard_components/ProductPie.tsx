import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { CategoriaData } from "../../types/models.ts";

interface Props {
  categorias: CategoriaData[];
}

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
];

const ProductsPie = ({ categorias }: Props) => {
  const data = categorias.map((c) => ({ name: c.categoria, value: c.count }));

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg text-white w-full h-80">
      <h3 className="text-lg font-semibold mb-4">Distribución por categoría</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              border: "1px solid #374151",
              color: "#fff"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductsPie;
