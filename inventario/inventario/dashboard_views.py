from django.db.models import Sum, Count, F
from django.db.models.functions import TruncMonth
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime

from productos.models import Productos
from clientes.models import Cliente
from ventas.models import Venta

@api_view(['GET'])
def dashboard_stats(request):
    # Totales simples
    total_productos = Productos.objects.count()
    total_clientes = Cliente.objects.count()
    ventas_aggregate = Venta.objects.aggregate(total=Sum('total'))
    total_ventas_monto = ventas_aggregate['total'] or 0

    # Productos con stock bajo
    stock_bajo_count = Productos.objects.filter(stock_actual__lte=F('stock_minimo')).count()

    # Ventas por mes
    ventas_por_mes_qs = (
        Venta.objects
            .annotate(mes=TruncMonth('fecha'))
            .values('mes')
            .annotate(total_mes=Sum('total'))
            .order_by('mes')
    )

    ventas_por_mes = []
    for row in ventas_por_mes_qs:
        mes = row['mes']
        ventas_por_mes.append({
            "mes": mes.strftime('%b %Y'),    # Ej: "Nov 2025"
            "total": float(row['total_mes'] or 0)
        })

    # Productos por categoría
    productos_por_categoria_qs = Productos.objects.values('categoria').annotate(count=Count('id')).order_by('-count')
    productos_por_categoria = [
        {"categoria": p['categoria'] or 'Sin categoría', "count": p['count']}
        for p in productos_por_categoria_qs
    ]
    
    print("=== DEBUG DASHBOARD ===")
    print("Total productos:", total_productos)
    print("Total clientes:", total_clientes)
    print("Monto total de ventas:", total_ventas_monto)
    print("Stock bajo:", stock_bajo_count)
    print("Ventas por mes:", list(ventas_por_mes))
    print("Productos por categoría:", list(productos_por_categoria))
    print("========================")

    return Response({
        "totales": {
            "productos": total_productos,
            "clientes": total_clientes,
            "monto_ventas": float(total_ventas_monto),
            "stock_bajo": stock_bajo_count
        },
        "ventas_por_mes": ventas_por_mes,
        "productos_por_categoria": productos_por_categoria
    })
