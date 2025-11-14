from rest_framework import serializers
from .models import Venta, DetalleVenta
from productos.models import Productos
from clientes.models import Cliente

class DetalleVentaSerializer(serializers.ModelSerializer):
    producto = serializers.PrimaryKeyRelatedField(queryset=Productos.objects.all())
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)

    class Meta:
        model = DetalleVenta
        fields = ['id', 'producto', 'producto_nombre', 'cantidad', 'precio_unitario', 'subtotal']
        read_only_fields = ['precio_unitario', 'subtotal']

class VentaSerializer(serializers.ModelSerializer):
    cliente_nombre = serializers.CharField(source='cliente.nombre', read_only=True)
    detalles = DetalleVentaSerializer(many=True)
    
    class Meta:
        model = Venta
        fields = '__all__'
        
    def create(self, validated_data):
        detalles_data = validated_data.pop('detalles')
        venta = Venta.objects.create(**validated_data)
        total = 0

        for detalle_data in detalles_data:
            producto = detalle_data['producto']
            cantidad = detalle_data['cantidad']
            
            # Valida cantidad y stock antes de crear nada
            if cantidad <= 0:
                raise serializers.ValidationError(
                    {"detalles": [f"La cantidad de {producto.nombre} debe ser mayor que 0."]}
                )

            if producto.stock_actual < cantidad:
                raise serializers.ValidationError(
                    {"detalles": [f"Stock insuficiente para {producto.nombre}. Solo hay {producto.stock_actual} disponibles."]}
                )
                
            precio_unitario = producto.precio_venta
            subtotal = cantidad * precio_unitario

            DetalleVenta.objects.create(
                venta=venta,
                producto=producto,
                cantidad=cantidad,
                precio_unitario=precio_unitario,
                subtotal=subtotal
            )
            
            producto.stock_actual -= cantidad
            producto.save()

            total += subtotal

        venta.total = total
        venta.save()
        return venta
    
