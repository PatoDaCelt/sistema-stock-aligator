import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Sun,
  Moon,
} from "lucide-react";

const Slidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  //Dark mode al body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Productos", icon: <Package size={20} />, path: "/productos" },
    { name: "Clientes", icon: <Users size={20} />, path: "/clientes" },
    { name: "Ventas", icon: <ShoppingCart size={20} />, path: "/ventas" },
  ];

  return (
    <motion.div
      animate={{ width: open ? 230 : 70 }}
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-700 text-white"
      } flex flex-col transition-all p-3 h-full md:h-screen sticky top-0 z-50`}
    >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1
            className={`text-xl font-bold tracking-wide transition-opacity duration-300 ${
              !open && "opacity-0 hidden"
            }`}
          >
            Aligator Stock
          </h1>
          <button
            onClick={() => setOpen(!open)}
            className="p-1 rounded hover:bg-blue-800 transition"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-800 transition ${
                location.pathname === item.path ? "bg-blue-800" : ""
              }`}
            >
              {item.icon}
              <span
                className={`text-sm font-medium transition-opacity duration-300 ${
                  !open && "opacity-0 hidden"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Palanca Modo Oscuro */}
        <div className="mt-auto flex items-center justify-between p-2 border-t border-blue-500 dark:border-gray-700">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 text-sm"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className={`${!open && "hidden"}`}>
              {darkMode ? "Claro" : "Oscuro"}
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto text-xs text-center text-blue-200">
          {!open ? "" : "© 2025 Aligator Corp"}
        </div>
    </motion.div>
  );
};

export default Slidebar;
