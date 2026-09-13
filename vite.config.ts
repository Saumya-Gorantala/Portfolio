import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const configuredBase = process.env.BASE_URL || '/';
const base = configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`;

// https://vitejs.dev/config/
export default defineConfig({
  base,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
