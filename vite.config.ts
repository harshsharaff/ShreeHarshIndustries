// Shared TanStack Start Vite config already includes tanstackStart, viteReact,
// tailwindcss, tsConfigPaths and nitro. Do not add those plugins again here.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Public URL path for GitHub project Pages. Unset locally so / still works.
const pagesBase = process.env.PAGES_BASE ?? "/";

export default defineConfig({
  vite: { base: pagesBase },
  // Cloudflare/Nitro worker has no dist/server/server.js, so prerender cannot run.
  nitro: pagesBase === "/" ? undefined : false,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    router: {
      basepath: pagesBase === "/" ? "/" : pagesBase.replace(/\/$/, ""),
    },
    prerender: {
      enabled: pagesBase !== "/",
      crawlLinks: true,
    },
  },
});
