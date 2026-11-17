from django.contrib import admin

from .models import Categoria, Producto

admin.site.site_header = "Dado & Mesa · Administración"


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    search_fields = ["nombre"]


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ["nombre", "categoria", "precio", "cantidad_disponible", "descuento"]
    list_editable = ["cantidad_disponible", "descuento"]
    list_filter = ["categoria"]
    search_fields = ["nombre", "descripcion"]
    list_select_related = ["categoria"]
