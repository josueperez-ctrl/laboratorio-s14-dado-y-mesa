import { cn } from "@/lib/utils";

const variants = {
  default: "bg-primary text-primary-foreground hover:bg-emerald-950",
  outline: "border border-border bg-card text-foreground hover:bg-muted",
  accent: "bg-accent text-foreground hover:bg-amber-300",
};

export function Button({ className, variant = "default", as: Component = "button", ...props }) {
  return <Component data-slot="button" className={cn(
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50",
    variants[variant],
    className,
  )} {...props} />;
}
