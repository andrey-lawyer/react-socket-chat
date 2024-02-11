// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     "process.env": process.env,
//   },
// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig(() => {
  const env = loadEnv("mock", process.cwd(), "");
  const processEnvValues = {
    "process.env": Object.entries(env).reduce((prev, [key, val]) => {
      console.log(key, val);
      return {
        ...prev,
        [key]: val,
      };
    }, {}),
  };

  return {
    plugins: [react()],
    define: processEnvValues,
  };
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
