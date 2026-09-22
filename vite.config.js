import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Marketing website for Bispun CRM.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
    },
  },
});
