from decimal import Decimal

from django.core.validators import MinValueValidator, RegexValidator
from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=80, unique=True)

    class Meta:
        ordering = ["nombre"]
        verbose_name_plural = "categorías"

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=120)
    descripcion = models.TextField("descripción")
    precio = models.DecimalField(max_digits=9, decimal_places=2, validators=[MinValueValidator(Decimal("0.00"))])
    imagen = models.CharField(max_length=500, validators=[RegexValidator(r"^(https?://[^\s]+|/imagenes/[\w-]+\.png)$", "Ingresa una URL HTTP(S) o una imagen local del catálogo.")])
    cantidad_disponible = models.PositiveIntegerField(default=0)
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT, related_name="productos")

    class Meta:
        ordering = ["nombre", "id"]
        constraints = [models.CheckConstraint(check=models.Q(precio__gte=0), name="producto_precio_no_negativo")]

    def __str__(self):
        return self.nombre
