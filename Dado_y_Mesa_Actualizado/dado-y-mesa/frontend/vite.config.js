import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const proxy = { "/api": "http://127.0.0.1:8000" };

export default defineConfig({
  plugins: [tailwindcss()],
  esbuild: { jsx: "automatic" },
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  server: { proxy },
  preview: { proxy },
});
