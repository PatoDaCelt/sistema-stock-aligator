import { useEffect, useState } from "react";
import api from "../api";
import type { Producto } from "../types/models";

export default function ProductosList() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    api.get<Producto[]>("productos/")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <div>
      <h2>Inventario de Productos</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio venta</th>
            <th>Stock</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.precio_venta}</td>
              <td>{p.stock_actual}</td>
              <td>{p.bajo_stock ? "Bajo stock" : "OK"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
