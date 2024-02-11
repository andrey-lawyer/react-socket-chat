import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
});

// import { defineConfig, loadEnv } from "vite";

// export default ({ mode }) => {
//   // Load app-level env vars to node-level env vars.
//   // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

//   return defineConfig({
//     plugins: [react()],
//     define: {
//       "process.env": process.env,
//     },
//   });
// };
