from rest_framework import serializers
from .models import Productos, Proveedor

class ProveedorSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Proveedor
        fields = '__all__'
        
class ProductoSerializer(serializers.ModelSerializer):
    proveedor_nombre = serializers.CharField(source='proveedor.nombre', read_only=True)
    bajo_stock = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Productos
        fields = '__all__'