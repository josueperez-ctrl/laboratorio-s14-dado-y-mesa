import { useEffect, useState } from "react";

import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import { obtenerCategorias, obtenerProductos } from "@/services/catalogo";

function normalizar(texto) {
  return texto.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();
}

function tieneOferta(producto) {
  return producto.descuento > 0 && producto.cantidad_disponible > 0;
}

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState("");
  const [soloOfertas, setSoloOfertas] = useState(false);
  const [seleccion, setSeleccion] = useState(null);
  const [intento, setIntento] = useState(0);
  const [catalogo, setCatalogo] = useState({ estado: "cargando", categorias: [], productos: [] });

  useEffect(() => {
    const control = new AbortController();

    Promise.all([obtenerCategorias(control.signal), obtenerProductos(control.signal)])
      .then(([categorias, productos]) => setCatalogo({ estado: "listo", categorias, productos }))
      .catch(() => {
        if (!control.signal.aborted) {
          setCatalogo({ estado: "error", categorias: [], productos: [] });
        }
      });

    return () => control.abort();
  }, [intento]);

  const termino = normalizar(busqueda);
  const cantidadOfertas = catalogo.productos.filter(tieneOferta).length;
  const visibles = catalogo.productos.filter((producto) => {
    const coincideCategoria = seleccion === null || producto.categoria.id === seleccion;
    const coincideTexto = normalizar(`${producto.nombre} ${producto.descripcion}`).includes(termino);
    return coincideCategoria && coincideTexto && (!soloOfertas || tieneOferta(producto));
  });

  const referencia = termino ? visibles[0] : undefined;
  const categoriaAfin = seleccion ?? referencia?.categoria.id;
  const recomendaciones = catalogo.productos
    .filter((producto) => producto.cantidad_disponible > 0 && producto.id !== referencia?.id)
    .sort((a, b) => {
      const afinA = Number(a.categoria.id === categoriaAfin);
      const afinB = Number(b.categoria.id === categoriaAfin);
      return (afinB - afinA) || ((b.descuento ?? 0) - (a.descuento ?? 0)) || (a.id - b.id);
    })
    .slice(0, 3);

  function reintentar() {
    setCatalogo({ estado: "cargando", categorias: [], productos: [] });
    setIntento((actual) => actual + 1);
  }

  return (
    <>
      <Header />
      <main>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 py-12 sm:py-16 md:grid-cols-[3fr_2fr]">
            <div>
              <h1 className="max-w-xl font-display text-4xl font-bold leading-tight sm:text-6xl">La próxima partida empieza aquí</h1>
              <p className="my-5 max-w-lg text-base text-green-50">Explora juegos de estrategia, cartas y accesorios para compartir alrededor de la mesa.</p>
              <Button as="a" href="#catalogo" variant="accent">Explorar catálogo <span aria-hidden="true">↓</span></Button>
            </div>
            <div className="hidden place-items-center overflow-hidden rounded-3xl bg-emerald-950 md:grid">
              <img src="/imagenes/hero.png" alt="" className="aspect-[5/3] w-full object-cover" />
            </div>
          </div>
        </section>
        <section id="catalogo" className="mx-auto max-w-6xl px-5 py-10 sm:py-14" aria-labelledby="titulo-catalogo">
          <h2 id="titulo-catalogo" className="mb-5 font-display text-3xl font-bold">Catálogo</h2>
          {catalogo.estado === "cargando" && <p role="status">Cargando el catálogo…</p>}
          {catalogo.estado === "error" && (
            <div className="rounded-xl border border-border bg-card p-5">
              <p role="alert" className="mb-4">No pudimos cargar el catálogo. Revisa que Django esté ejecutándose.</p>
              <Button type="button" onClick={reintentar}>Reintentar</Button>
            </div>
          )}
          {catalogo.estado === "listo" && (
            <>
              {cantidadOfertas > 0 && (
                <p className="mb-5 rounded-xl bg-accent px-4 py-3 font-semibold">
                  Promociones activas · {cantidadOfertas} {cantidadOfertas === 1 ? "producto" : "productos"} con descuento
                </p>
              )}
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm font-semibold">
                  Buscar juegos y accesorios
                  <input type="search" value={busqueda}
                    onChange={(evento) => setBusqueda(evento.target.value)}
                    placeholder="Ej. ajedrez o cartas"
                    className="w-full rounded-xl border border-border bg-card px-4 py-2" />
                </label>
                <Button type="button" variant={soloOfertas ? "default" : "outline"}
                  aria-pressed={soloOfertas} onClick={() => setSoloOfertas(!soloOfertas)}>
                  Solo ofertas
                </Button>
              </div>
              <CategoryFilter categorias={catalogo.categorias} seleccion={seleccion} onChange={setSeleccion} />
              <p className="mb-5 mt-4 text-sm text-muted-foreground" aria-live="polite">
                {visibles.length} {visibles.length === 1 ? "producto" : "productos"}
              </p>
              <ProductList productos={visibles} />
              {recomendaciones.length > 0 && (
                <section className="mt-12" aria-labelledby="titulo-recomendaciones">
                  <h2 id="titulo-recomendaciones" className="mb-4 font-display text-2xl font-bold">
                    Recomendados para tu próxima partida
                  </h2>
                  <ProductList productos={recomendaciones} />
                </section>
              )}
            </>
          )}
        </section>
      </main>
      <footer id="tienda" className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <h2 className="font-display text-xl font-bold">Dado &amp; Mesa</h2>
          <p className="mt-2 text-sm text-muted-foreground">Tienda de juegos de mesa, cartas y accesorios.</p>
        </div>
      </footer>
    </>
  );
}
