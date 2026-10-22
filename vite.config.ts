import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/electric-elegance-studio/",
  },
  tanstackStart: {
    spa: {
      enabled: true,
    },
    server: {
      entry: "server",
    },
  },
});
