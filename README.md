# sistema-stock-aligator
Sistema de Stock Aligator

Proyecto: Sistema de Inventario 
Backend en Django + Django REST Framework + PostgreSQL 
Frontend en React (Vite) + TypeScript.


# Backend (Django):

Estructura del proyecto con apps: productos, clientes, ventas.

Modelos: Producto, Proveedor, Cliente, Venta, DetalleVenta.

Lógica de negocio básica: decremento de stock al crear ventas, validaciones de stock, propiedad bajo_stock en Producto.

Serializers para los modelos (Django REST Framework).

ViewSets (ModelViewSet) para productos, proveedores, clientes, ventas, detalles.

Rutas registradas con DefaultRouter bajo /api/.

CORS configurado (django-cors-headers) para permitir requests desde el frontend

# Frontend (React + Vite + TypeScript):

Proyecto creado con Vite (React + TypeScript).

axios configurado en src/api.ts con baseURL apuntando al backend.

Tipos/Interfaces en src/types/models.ts para Producto, Cliente, Venta, DetalleVenta.

Componente inicial ProductosList que consume GET /api/productos/ y renderiza una tabla con los productos y estado de stock.

Dependencias instaladas: axios, recharts, react-router-dom.


# Estructura del proyecto

sistema-stock-aligator/ # raíz del repo git

├── inventario/ 

│       ├── manage.py

│       ├── inventario/ # settings, urls, wsgi/asgi

│       ├── productos/

│       ├── clientes/

│       ├── ventas/

│       └── requirements.txt

└── frontend/ 

        ├── index.html
        
        ├── package.json
        
        ├── tsconfig.json
        
        └── src/


Cómo ejecutar el proyecto localmente (desarrollo)

# Backend (Django)

1- Abrir terminal en backend/.

2- Crear y activar entorno virtual:

```python -m venv venv```
```# Linux/macOS```
```source venv/bin/activate```
```# Windows```
```venv\Scripts\activate```

3- Instalar dependencias:

```pip install -r requirements.txt```

4- Configurar variables de entorno (.env) y crear la base de datos PostgreSQL (aligator_stock_db).

5- Ejecutar migraciones:

```python manage.py makemigrations```
```python manage.py migrate```

6- Crear superusuario (opcional):

```python manage.py createsuperuser```

7- Levantar el servidor

```python manage.py runserver```

# Frontend (React + Vite + TypeScript)

1- Abrir otra terminal en inventario-frontend/.

2- Instalar dependencias (si no lo hiciste):

```npm install```

3- Ejecutar dev server de Vite:

```npm run dev```
