from decimal import Decimal, ROUND_HALF_UP

from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
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
    descuento = models.PositiveSmallIntegerField(
        "descuento (%)", default=0, validators=[MaxValueValidator(100)],
    )

    @property
    def precio_final(self):
        if self.cantidad_disponible == 0:
            return self.precio
        return (self.precio * (100 - self.descuento) / 100).quantize(
            Decimal("0.01"), rounding=ROUND_HALF_UP,
        )
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT, related_name="productos")

    class Meta:
        ordering = ["nombre", "id"]
        constraints = [
            models.CheckConstraint(condition=models.Q(precio__gte=0), name="producto_precio_no_negativo"),
            models.CheckConstraint(condition=models.Q(descuento__lte=100), name="producto_descuento_maximo"),
        ]

    def __str__(self):
        return self.nombre
