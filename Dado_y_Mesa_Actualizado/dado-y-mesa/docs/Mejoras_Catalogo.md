# Dado & Mesa · Ampliación del catálogo

**Autor:** Josué Pérez Herrera · **Curso:** Aplicaciones Empresariales · **Grupo:** C24 D

## Objetivos, público y alcance

- Hacer que el cliente encuentre juegos, compare ofertas y consulte disponibilidad desde el celular o la computadora.
- Permitir que el personal actualice existencias y descuentos desde Django Admin.
- Sugerir productos disponibles según la categoría seleccionada o el primer resultado de la búsqueda.

El catálogo está dirigido a familias, grupos de amigos y aficionados a los juegos de mesa. El personal de la tienda usa el panel administrativo.

## Implementación y resultados

| Evidencia | Descripción |
| --- | --- |
| [01 · Catálogo](capturas-mejoras/01-catalogo.png) | La página carga los productos y categorías desde Django REST Framework. Las tarjetas muestran categoría, imagen, precio y existencias. |
| [02 · Búsqueda y recomendaciones](capturas-mejoras/02-busqueda-recomendaciones.png) | Buscar «ajedrez» deja una coincidencia en el catálogo. «Islas del sur» aparece primero entre las recomendaciones por pertenecer a Estrategia y tener stock. |
| [03 · Ofertas en móvil](capturas-mejoras/03-ofertas-movil.png) | A 390 px, los controles se apilan y la cuadrícula pasa a una columna. «Solo ofertas» filtra los descuentos con stock. |
| [04 · Gestión de inventario](capturas-mejoras/04-inventario-admin.png) | El personal edita el stock y el porcentaje de descuento desde el listado de productos de Django Admin. |
| [05 · Cambio reflejado en el catálogo](capturas-mejoras/05-stock-actualizado.png) | Tras editar el ajedrez, el catálogo mostró 13 unidades y S/ 67.43 con el 25 % de descuento. Se restauraron los datos iniciales al terminar la prueba. |
| [06 · Proceso](capturas-mejoras/06-proceso.png) | La migración añadió el campo de descuento y su restricción. Django cargó el catálogo de demostración y Vite compiló el frontend. |
| [07 · Cálculo de descuentos](capturas-mejoras/07-codigo-descuentos.png) | Django valida el porcentaje entre 0 y 100 y calcula el precio final con dos decimales. La API entrega ese valor a React. |
| [08 · Filtros y recomendaciones](capturas-mejoras/08-codigo-filtros.png) | React combina texto, categoría y ofertas. Prioriza hasta tres sugerencias con stock, ordenadas por coincidencia de categoría y descuento. |

## Pruebas

- La API devolvió seis productos. Con el 20 % de descuento inicial, el ajedrez pasó de S/ 89.90 a S/ 71.92.
- «CLASICA» encontró «Baraja clásica» al combinar búsqueda con el filtro Cartas.
- «Solo ofertas» mostró el ajedrez y Fauna andina en el listado principal.
- Se comprobó que la vista de 390 px no tuviera desplazamiento horizontal.
- Se verificó que los cambios de stock y descuento llegaran al catálogo al recargar.

## Ejecutar

Consulta la [guía del proyecto](../README.md) para iniciar Django y React. En una base que ya contiene productos, ejecuta `manage.py migrate` y configura los descuentos en Django Admin. Usa `loaddata catalogo_demo` únicamente para preparar una base de demostración.
