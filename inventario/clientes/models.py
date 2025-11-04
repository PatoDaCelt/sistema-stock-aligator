from django.db import models

class Cliente(models.Model):
    """Guarda la info básica del cliente"""
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(blank=True)
    telefono =models.CharField(max_length=20, blank=True)
    direccion = models.TextField(blank=True)
    
    def __str__(self):
        """"""
        return self.nombre