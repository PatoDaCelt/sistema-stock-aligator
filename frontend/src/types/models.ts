export interface Proveedor {
  id: number;
  nombre: string;
  contacto: string;
  telefono: string;
}

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number; //precio_venta
  stock: number; //stock_actual
  stock_minimo: number;
}

export interface Cliente {
  id: number;
  nombre: string;
  correo: string;
  telefono?: string;
  direccion?: string;
  fecha_registro: string;
}

export interface DetalleVenta {
  id: number;
  producto: string;
  producto_nombre: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface DetalleVentaInput {
  producto: number;
  cantidad: number;
}

export interface Venta {
  id: number;
  cliente: string;
  cliente_nombre: string;
  fecha: string;
  total: number;
  detalles?: DetalleVenta[];
}

export interface NuevaVentaData {
  cliente: number; 
  detalles: DetalleVentaInput[];
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
