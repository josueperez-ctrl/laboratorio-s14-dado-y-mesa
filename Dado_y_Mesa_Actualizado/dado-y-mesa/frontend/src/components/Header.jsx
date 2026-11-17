

export default function Header() {
  return (
    <header id="inicio" className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <a href="#inicio" className="inline-flex items-center gap-2 font-display text-xl font-bold">
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-lg bg-primary text-xl text-accent">⚄</span> Dado &amp; Mesa
        </a>
        <nav aria-label="Navegación principal" className="flex gap-5 text-sm font-semibold">
          <a href="#inicio" className="hover:underline">Inicio</a>
          <a href="#catalogo" className="hover:underline">Catálogo</a>
          <a href="#tienda" className="hover:underline">La tienda</a>
        </nav>
      </div>
    </header>
  );
}
