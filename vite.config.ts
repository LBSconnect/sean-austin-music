import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const isReplit = process.env.REPL_ID !== undefined;

export default defineConfig({
  plugins: [
    react(),
    // Only load Replit plugins when running on Replit
    ...(isReplit && process.env.NODE_ENV !== "production"
      ? [
          (async () => {
            try {
              const { default: runtimeErrorOverlay } = await import("@replit/vite-plugin-runtime-error-modal");
              return runtimeErrorOverlay();
            } catch { return null; }
          })(),
          (async () => {
            try {
              const { cartographer } = await import("@replit/vite-plugin-cartographer");
              return cartographer();
            } catch { return null; }
          })(),
          (async () => {
            try {
              const { devBanner } = await import("@replit/vite-plugin-dev-banner");
              return devBanner();
            } catch { return null; }
          })(),
        ].filter(Boolean)
      : []),
  ].flat().filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
