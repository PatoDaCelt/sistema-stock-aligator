import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/productos/";

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number; //precio_venta
  stock: number; //stock_actual
  stock_minimo: number;
}

interface ProductoBackend {
  id: number;
  nombre: string;
  categoria: string;
  precio_compra: string;
  precio_venta: string;
  stock_actual: number;
  stock_minimo: number;
  proveedor: number | null;
  fecha_creacion: string;
}

export default function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    try {
      const res = await axios.get<ProductoBackend[]>(API_URL);
      const productosAdaptados: Producto[] = res.data.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria,
        precio: parseFloat(p.precio_venta),
        stock: p.stock_actual,
        stock_minimo: p.stock_minimo,
      }));
      //Datos recibidos del back
      console.log("DATA Dashboard:", productosAdaptados);
      setProductos(productosAdaptados);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("No se pudieron cargar los productos");
      setLoading(false);
    }
  };

  const createProducto = async (nuevo: Omit<Producto, "id">) => {
    const res = await axios.post<ProductoBackend>(API_URL, {
      nombre: nuevo.nombre,
      categoria: nuevo.categoria,
      precio_venta: nuevo.precio,
      precio_compra: nuevo.precio,
      stock_actual: nuevo.stock,
      stock_minimo: nuevo.stock_minimo,
    });
    const nuevoAdaptado: Producto = {
      id: res.data.id,
      nombre: res.data.nombre,
      categoria: res.data.categoria,
      precio: parseFloat(res.data.precio_venta),
      stock: res.data.stock_actual,
      stock_minimo: res.data.stock_minimo,
    };
    setProductos([...productos, nuevoAdaptado]);
  };

  const updateProducto = async (id: number, actualizado: Partial<Producto>) => {
    const productoOriginal = productos.find((p) => p.id === id);
    if (!productoOriginal) return;

    const payload = {
      nombre: actualizado.nombre || productoOriginal.nombre,
      categoria: actualizado.categoria || productoOriginal.categoria,
      precio_compra: actualizado.precio || productoOriginal.precio,
      precio_venta: actualizado.precio || productoOriginal.precio,
      stock_actual: actualizado.stock ?? productoOriginal.stock,
      stock_minimo: actualizado.stock_minimo ?? productoOriginal.stock_minimo,
      proveedor: null,
    };

    const res = await axios.put(`${API_URL}${id}/`, payload);

    const actualizadoAdaptado: Producto = {
      id: res.data.id,
      nombre: res.data.nombre,
      categoria: res.data.categoria,
      precio: parseFloat(res.data.precio_venta),
      stock: res.data.stock_actual,
      stock_minimo: res.data.stock_minimo,
    };

    setProductos(productos.map((p) => (p.id === id ? actualizadoAdaptado : p)));
  };

  const deleteProducto = async (id: number) => {
    await axios.delete(`${API_URL}${id}/`);
    setProductos(productos.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    productos,
    loading,
    error,
    createProducto,
    updateProducto,
    deleteProducto,
  };
}
