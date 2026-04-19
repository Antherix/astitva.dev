import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";

export default defineConfig(async ({ command, mode }) => {
  const plugins = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    viteReact(),
  ];

  if (command === "build") {
    try {
      const { cloudflare } = await import("@cloudflare/vite-plugin");
      plugins.push(
        cloudflare({
          viteEnvironment: { name: "ssr" },
        }),
      );
    } catch {
      /* optional */
    }
  }

  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(loadEnv(mode, process.cwd(), "VITE_"))) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  return mergeConfig(
    {
      define: envDefine,
      resolve: {
        alias: { "@": `${process.cwd()}/src` },
        dedupe: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react/jsx-dev-runtime",
          "@tanstack/react-query",
          "@tanstack/query-core",
        ],
      },
      plugins,
    },
    {
      server: {
        host: "::",
        port: 5173,
      },
    },
  );
});
