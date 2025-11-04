from django.shortcuts import render
from rest_framework import viewsets
from .models import Venta, DetalleVenta
from .serializers import VentaSerializer, DetalleVentaSerializer

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all().order_by('-fecha')
    serializer_class = VentaSerializer
    
class DetalleVentaViewSet(viewsets.ModelViewSet):
    queryset = DetalleVenta.objects.all()
    serializer_class = DetalleVentaSerializer