const api = "/api";

async function obtenerListado(recurso, signal) {
  const respuesta = await fetch(`${api}/${recurso}/`, {
    signal,
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!respuesta.ok) throw new Error(`La consulta devolvió HTTP ${respuesta.status}.`);

  const listado = await respuesta.json();
  if (!Array.isArray(listado)) throw new Error("La API no devolvió un listado.");
  return listado;
}

export function obtenerProductos(signal) {
  return obtenerListado("productos", signal);
}

export function obtenerCategorias(signal) {
  return obtenerListado("categorias", signal);
}
