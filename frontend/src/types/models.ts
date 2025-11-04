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
