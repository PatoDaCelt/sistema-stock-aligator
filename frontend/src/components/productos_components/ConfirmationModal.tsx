import { motion } from "framer-motion";

interface ConfirmationModalProps {
  productoNombre: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  productoNombre,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      {/* Tarjeta del Modal  */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-sm border border-gray-700"
      >
        <h3 className="text-xl font-bold text-white mb-4">
          Confirmar Eliminación
        </h3>
        <p className="text-gray-300 mb-6">
          ¿Estás seguro de que quieres eliminar el producto:
          <span className="font-semibold text-red-400">
            {" "}
            "{productoNombre}"
          </span>
          ? Esta acción <span className="font-bold">no se puede deshacer</span>.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            Sí, Eliminar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationModal;
