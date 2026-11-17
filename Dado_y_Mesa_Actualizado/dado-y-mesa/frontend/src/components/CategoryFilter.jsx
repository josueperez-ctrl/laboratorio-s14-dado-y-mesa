import { Button } from "@/components/ui/button";

export default function CategoryFilter({ categorias, seleccion, onChange }) {
  const opciones = [{ id: null, nombre: "Todas" }, ...categorias];

  return (
    <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
      {opciones.map(({ id, nombre }) => (
        <Button key={id ?? "todas"} type="button" aria-pressed={seleccion === id}
          variant={seleccion === id ? "default" : "outline"} onClick={() => onChange(id)}>
          {nombre}
        </Button>
      ))}
    </div>
  );
}
