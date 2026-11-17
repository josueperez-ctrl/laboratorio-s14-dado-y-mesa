import { cn } from "@/lib/utils";

export function Card({ className, ...props }) {
  return <article data-slot="card" className={cn("overflow-hidden rounded-2xl border border-border bg-card", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cn("p-5", className)} {...props} />;
}
