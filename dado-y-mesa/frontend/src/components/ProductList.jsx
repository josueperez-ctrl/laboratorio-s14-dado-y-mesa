import ProductCard from "@/components/ProductCard";

export default function ProductList({ productos }) {
  if (productos.length === 0) {
    return <p className="rounded-xl border border-border p-5" role="status">Esta categoría todavía no tiene productos.</p>;
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {productos.map((producto) => (
        <li key={producto.id}>
          <ProductCard nombre={producto.nombre} descripcion={producto.descripcion}
            precio={producto.precio} imagen={producto.imagen} categoria={producto.categoria.nombre}
            cantidadDisponible={producto.cantidad_disponible} />
        </li>
      ))}
    </ul>
  );
}
