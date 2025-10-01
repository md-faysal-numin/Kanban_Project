import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/Kanban_Project/", // GitHub repo name
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        addTask: resolve(__dirname, "src/Pages/addTask.html"),
        board: resolve(__dirname, "src/Pages/board.html"),
        editTask: resolve(__dirname, "src/Pages/editTask.html"),
        login: resolve(__dirname, "src/Pages/login.html"),
        register: resolve(__dirname, "src/Pages/register.html"),
      },
    },
  },
});
