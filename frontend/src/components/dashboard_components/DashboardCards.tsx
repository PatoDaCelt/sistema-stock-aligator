import { Package, Users, ShoppingCart, AlertTriangle } from "lucide-react";
import type { Totales } from "../../types/models.ts";

interface Props {
  totals: Totales;
}

const DashboardCards = ({ totals }: Props) => {
  const cards = [
    {
      title: "Productos",
      value: totals.productos,
      icon: <Package size={28} />,
      color: "bg-blue-600",
    },
    {
      title: "Clientes",
      value: totals.clientes,
      icon: <Users size={28} />,
      color: "bg-green-600",
    },
    {
      title: "Monto ventas",
      value: `$${totals.monto_ventas.toFixed(2)}`,
      icon: <ShoppingCart size={28} />,
      color: "bg-purple-600",
    },
    {
      title: "Stock Bajo",
      value: totals.stock_bajo,
      icon: <AlertTriangle size={28} />,
      color: "bg-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex items-center justify-between p-4 rounded-xl bg-gray-800 text-white shadow-lg hover:shadow-blue-900 transition-all"
        >
          <div>
            <p className="text-sm text-gray-400">{card.title}</p>
            <h2 className="text-2xl font-bold">{card.value}</h2>
          </div>
          <div className={`${card.color} p-3 rounded-full text-white`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
