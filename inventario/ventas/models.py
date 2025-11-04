from django.db import models
from productos.models import Productos
from clientes.models import Cliente

class Venta(models.Model):
    """Transacción generada"""
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True)
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    def __str__(self):
        return f"Venta #{self.id} - {self.fecha.strftime('%Y-%m-%d')}"
    
class DetalleVenta(models.Model):
    """Info de cada producto vendido"""
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, related_name="detalles")
    producto = models.ForeignKey(Productos, on_delete=models.SET_NULL, null=True)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    
    def save(self, *args, **kwargs):
        # Calcular subtotal y actualizar el stock
        self.subtotal = self.cantidad * self.precio_unitario
        super().save(*args, **kwargs)
        if self.producto:
            self.producto.stock_actual -= self.cantidad
            self.producto.save()