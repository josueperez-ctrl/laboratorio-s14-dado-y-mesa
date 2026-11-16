import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

const soles = new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" });

export default function ProductCard({ nombre, descripcion, precio, imagen, categoria, cantidadDisponible }) {
  const [imagenFallida, setImagenFallida] = useState(null);

  return (
    <Card className="flex h-full flex-col">
      <div className="grid aspect-[16/10] place-items-center bg-muted">
        {imagen && imagenFallida !== imagen ? (
          <img src={imagen} alt={nombre} loading="lazy" className="h-full w-full object-cover"
            onError={() => setImagenFallida(imagen)} />
        ) : <span className="text-4xl text-muted-foreground" aria-hidden="true">◇</span>}
      </div>
      <CardContent className="flex flex-1 flex-col">
        <p className="mb-2 self-start rounded-full bg-muted px-3 py-1 text-xs font-semibold">{categoria}</p>
        <h3 className="font-display text-xl font-bold">{nombre}</h3>
        <p className="mb-5 mt-2 flex-1 text-sm text-muted-foreground">{descripcion}</p>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
          <p className="text-lg font-bold">{soles.format(Number(precio))}</p>
          <p className="text-sm text-muted-foreground">{cantidadDisponible === 0 ? "Agotado" : `${cantidadDisponible} disponibles`}</p>
        </div>
      </CardContent>
    </Card>
  );
}
