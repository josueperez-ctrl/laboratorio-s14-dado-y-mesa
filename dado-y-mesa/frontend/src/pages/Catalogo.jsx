import { useEffect, useState } from "react";

import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import { obtenerCategorias, obtenerProductos } from "@/services/catalogo";

export default function Catalogo() {
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

  const visibles = catalogo.productos.filter((producto) =>
    seleccion === null || producto.categoria.id === seleccion,
  );

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
              <CategoryFilter categorias={catalogo.categorias} seleccion={seleccion} onChange={setSeleccion} />
              <p className="mb-5 mt-4 text-sm text-muted-foreground" aria-live="polite">
                {visibles.length} {visibles.length === 1 ? "producto" : "productos"}
              </p>
              <ProductList productos={visibles} />
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
