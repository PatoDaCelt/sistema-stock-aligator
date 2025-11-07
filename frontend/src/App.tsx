import Slidebar from "./components/Slidebar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      {/* Slidebar fijo a la izquierda */}
      <Slidebar />

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default App;