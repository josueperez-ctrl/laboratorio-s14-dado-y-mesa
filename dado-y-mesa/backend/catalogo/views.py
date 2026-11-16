from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Categoria, Producto
from .serializers import CategoriaSerializer, ProductoSerializer


class CategoriaViewSet(ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class ProductoViewSet(ReadOnlyModelViewSet):
    queryset = Producto.objects.select_related("categoria")
    serializer_class = ProductoSerializer
