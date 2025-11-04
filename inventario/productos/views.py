from django.shortcuts import render
from rest_framework import viewsets
from .models import Productos, Proveedor
from .serializers import ProductoSerializer, ProveedorSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Productos.objects.all().order_by('nombre')
    serializer_class = ProductoSerializer
    
    
class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer