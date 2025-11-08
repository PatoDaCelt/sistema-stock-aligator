import { useState } from "react"; // Eliminado useEffect
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/logoGator.png";
import {
  Menu,
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
} from "lucide-react";

const textVariants = {
  open: {
    opacity: 1,
    width: "auto",
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    width: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Slidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={24} />, path: "/" },
    { name: "Productos", icon: <Package size={24} />, path: "/productos" },
    { name: "Clientes", icon: <Users size={24} />, path: "/clientes" },
    { name: "Ventas", icon: <ShoppingCart size={24} />, path: "/ventas" },
  ];

  // Colores fijos
  const sidebarBg = "bg-gray-900";
  const activeBg = "bg-blue-800";
  const hoverBg = "hover:bg-blue-800";
  const primaryText = "text-blue-400";
  const secondaryText = "text-gray-400";

  return (
    <motion.div
      initial={false}
      animate={{ width: open ? 230 : 70 }}
      transition={{ type: "tween", duration: 0.2 }}
      variants={textVariants}
      style={{ overflow: "hidden", whiteSpace: "nowrap" }}
      className={`${sidebarBg} flex flex-col transition-all p-3 h-full md:h-screen sticky top-0 z-50`}
    >
      {/* Boton Hamburguer */}
      <div className="flex items-center justify-end-safe mb-4">
        <button
          onClick={() => setOpen(!open)}
          className={`mr-1 rounded text-white hover:bg-white/10 transition`}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Header */}
      <div className={`flex flex-col items-center gap-3 mb-8 px-1 ${!open ? 'justify-center' : ''}`}>
        {/* Logo siempre visible */}
        <img
          src={Logo}
          alt="Alligator Stock Logo"
          className="w-20 h-20 object-contain"
        />

        {/* Título solo visible cuando expandido */}
        {open && (
          <motion.p
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={`${primaryText} text-2xl font-bold tracking-wide`}
          >
            Alligator Stock
          </motion.p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-md transition
              ${location.pathname === item.path ? activeBg : hoverBg}
            `}
          >
            {/* Icono */}
            <div
              className={`
                ${primaryText} 
                ${!open ? "w-full flex justify-center items-center" : ""} 
                shrink-0
              `}
            >
              {item.icon}
            </div>

            {/* Texto */}
            <span
              className={`
                text-sm font-medium transition-opacity duration-300 ${primaryText}
                ${!open && "opacity-0 hidden"}
              `}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-xs text-center border-t border-gray-700 pt-2">
        <p className={`${secondaryText}`}>
          {!open ? "" : "© 2025 Aligator Corp"}
        </p>
      </div>
    </motion.div>
  );
};

export default Slidebar;
