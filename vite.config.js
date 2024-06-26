import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isProduction = mode === "production";

  const basePath =
    process.env.VITE_BASE_PATH ||
    (isProduction ? "/data-spirits-website/" : "/");

  return defineConfig({
    define: {
      __VITE_BASE_PATH__: JSON.stringify(basePath),
    },
    base: basePath,
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    // this will put plotly into it's own file, this way git doesn't blow up with each change to application
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("plotly.js-dist")) {
              return "plotly";
            }
          },
        },
      },
    },
  });
};
