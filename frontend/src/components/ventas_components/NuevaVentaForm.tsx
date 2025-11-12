import { useState, useEffect } from "react";
import axios from "axios";
import type { Producto, Cliente } from "../../types/models";
import type { NuevaVentaData } from "../../types/models";
import { Loader2 } from "lucide-react";

interface Props {
  onVentaCreada: () => void;
}

export default function NuevaVentaForm({ onVentaCreada }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [clienteId, setClienteId] = useState<number | "">("");
  const [items, setItems] = useState<{ producto: number; cantidad: number }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  // Cargar clientes y productos
  useEffect(() => {
    const fetchData = async () => {
      const [cRes, pRes] = await Promise.all([
        axios.get("http://localhost:8000/api/clientes/"),
        axios.get("http://localhost:8000/api/productos/"),
      ]);

      //Define un tipo local para el producto recibido del backend
      type ProductoAPI = Producto & { precio_venta?: number };

      const productosAdaptados = (pRes.data as ProductoAPI[]).map((p) => ({
        ...p,
        precio: p.precio_venta ?? p.precio ?? 0,
      }));

      setClientes(cRes.data);
      setProductos(productosAdaptados);
    };

    fetchData();
  }, []);

  // Agregar nuevo producto al formulario
  const agregarItem = () => setItems([...items, { producto: 0, cantidad: 1 }]);

  // Actualizar producto o cantidad
  const actualizarItem = (index: number, field: string, value: number) => {
    const nuevos = [...items];
    nuevos[index] = { ...nuevos[index], [field]: value };
    setItems(nuevos);
  };

  const eliminarItem = (index: number) =>
    setItems(items.filter((_, i) => i !== index));

  // Calcular total de la venta
  const calcularTotal = () =>
    items.reduce((acc, item) => {
      const p = productos.find((prod) => prod.id === item.producto);
      const precio = Number(p?.precio || 0);
      const cantidad = Number(item.cantidad || 0);
      return acc + precio * cantidad;
    }, 0);

  // Enviar venta al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Validaciones
    if (!clienteId) {
      alert("Debes seleccionar un cliente antes de registrar la venta.");
      return;
    }

    if (items.length === 0) {
      alert("Debes agregar al menos un producto a la venta.");
      return;
    }

    // Validar que no se supere el stock registrado
    for (const item of items) {
      const producto = productos.find((p) => p.id === item.producto);

      if (!producto) {
        alert("Hay productos no seleccionados. Verifica el formulario.");
        return;
      }

      if (item.cantidad <= 0) {
        alert(`Cantidad inválida para ${producto.nombre}.`);
        return;
      }

      if (item.cantidad > producto.stock) {
        alert(
          `Stock insuficiente para "${producto.nombre}". Solo hay ${producto.stock} unidades disponibles.`
        );
        return;
      }
    }

    const ventaData: NuevaVentaData = {
      cliente: Number(clienteId),
      detalles: items.map((i) => ({
        producto: i.producto,
        cantidad: i.cantidad,
      })),
    };

    try {
      setLoading(true);
      //Datos que se envian al backend
      console.log("Datos enviados:", JSON.stringify(ventaData, null, 2));

      await axios.post("http://localhost:8000/api/ventas/", ventaData);

      onVentaCreada();
      setClienteId("");
      setItems([]);

    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const data = error.response.data;
          if (typeof data === "object") {
            // Mostrar mensajes de error del backend
            const mensajes = Object.values(data).flat();
            alert(mensajes.join("\n"));
          } else {
            alert("Error en el servidor: " + data);
          }
        } else {
          alert("Error inesperado al registrar la venta.");
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-white mb-2">Nueva Venta</h2>

      {/* Seleccionar cliente */}
      <select
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={clienteId}
        onChange={(e) => setClienteId(Number(e.target.value))}
      >
        <option value="">Seleccionar cliente</option>
        {clientes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      {/* Lista de productos */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <select
            className="flex-1 p-2 rounded bg-gray-700 text-white"
            value={item.producto || ""}
            onChange={(e) =>
              actualizarItem(index, "producto", Number(e.target.value))
            }
          >
            <option value="">Producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            className="w-20 p-2 rounded bg-gray-700 text-white"
            value={item.cantidad}
            onChange={(e) =>
              actualizarItem(index, "cantidad", Number(e.target.value))
            }
          />

          <button
            type="button"
            onClick={() => eliminarItem(index)}
            className="text-red-400 hover:text-red-300 font-bold"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={agregarItem}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        + Agregar producto
      </button>

      {/* Total */}
      <div className="text-right text-gray-200 mt-4">
        <p>
          Total:{" "}
          <span className="font-semibold">${calcularTotal().toFixed(2)}</span>
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full flex justify-center items-center"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={18} /> Guardando...
          </>
        ) : (
          "Registrar venta"
        )}
      </button>
    </form>
  );
}
