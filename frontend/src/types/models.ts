export interface Proveedor {
  id: number;
  nombre: string;
  contacto: string;
  telefono: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio_venta: number;
  stock_actual: number;
  bajo_stock: boolean;
  proveedor_nombre?: string;
}

export interface Cliente {
  id: number;
  nombre: string;
  correo?: string;
  telefono?: string;
}

export interface DetalleVenta {
  id: number;
  producto_detalle: Producto;
  cantidad: number;
  subtotal: number;
}

export interface Venta {
  id: number;
  cliente_detalle: Cliente;
  fecha: string;
  total: number;
  detalles: DetalleVenta[];
}

//Models para el Dashboard
export interface Totales {
  productos: number;
  clientes: number;
  monto_ventas: number;
  stock_bajo: number;
}

export interface VentaMes {
  mes: string;
  total: number;
}

export interface CategoriaData {
  categoria: string;
  count: number;
}

export interface DashboardData {
  totales: Totales;
  ventas_por_mes: VentaMes[];
  productos_por_categoria: CategoriaData[];
}
