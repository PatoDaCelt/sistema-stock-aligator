import DashboardCards from "../components/dashboard_components/DashboardCards.tsx";
import SalesChart from "../components/dashboard_components/SalesChart.tsx";
import ProductsPie from "../components/dashboard_components/ProductPie.tsx";
import useDashboard from "../hooks/useDashboard.ts";
import loadingBg from "../assets/carrito.svg";

const Dashboard = () => {
  const { data, loading, error } = useDashboard();

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
          Cargando dashboard...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] text-red-400">
        Error: {error}
      </div>
    );

  if (!data)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] text-gray-300">
        Sin datos
      </div>
    );

  return (
    <div className="space-y-8 text-white">
      <DashboardCards totals={data.totales} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SalesChart ventas_por_mes={data.ventas_por_mes} />
        <ProductsPie categorias={data.productos_por_categoria} />
      </div>
    </div>
  );
};

export default Dashboard;