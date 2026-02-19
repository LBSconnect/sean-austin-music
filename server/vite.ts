import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, type ViteDevServer } from "vite";
import type { Server } from "http";

const viteLogger = {
  info: (msg: string) => console.log(`[vite] ${msg}`),
  warn: (msg: string) => console.warn(`[vite] ${msg}`),
  warnOnce: (msg: string) => console.warn(`[vite] ${msg}`),
  error: (msg: string) => console.error(`[vite] ${msg}`),
  clearScreen: () => {},
  hasErrorLogged: () => false,
  hasWarned: false,
};

export async function setupVite(server: Server, app: Express) {
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: { server },
    },
    appType: "custom",
    customLogger: viteLogger,
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        process.cwd(),
        "client",
        "index.html",
      );

      let template = fs.readFileSync(clientTemplate, "utf-8");
      template = await vite.transformIndexHtml(url, template);

      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
