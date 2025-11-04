from django.db import models

class Proveedor(models.Model):
    """Relaciona el Proveedor con el Producto"""
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, blank=True)
    correo = models.EmailField(blank=True)
    direccion = models.TextField(blank=True)
    
    def __str__(self):
        return self.nombre
    
class Productos(models.Model):
    """Representa los productos en stock"""
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=100)
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2)
    stock_actual = models.PositiveIntegerField(default=5)
    stock_minimo = models.PositiveIntegerField(default=5)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.SET_NULL, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.nombre
    
    @property
    def bajo_stock(self):
        return self.stock_Atual <= self.stock_minimo