import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: ["src/tests/**/*.test.*"],
  },
  optimizeDeps: {
    include: ["react-data-table-component"],
  },
});
