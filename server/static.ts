import express, { type Express } from "express";
import fs from "fs";
import path from "path";

// For CJS builds, __dirname will be provided by esbuild
// For ESM, we'll use import.meta.url (but this file is only used in production CJS builds)
declare const __dirname: string;

export function serveStatic(app: Express) {
  // In production build, dist/public contains the client build
  // When bundled to dist/index.cjs, __dirname will be "dist", so "public" is correct
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
