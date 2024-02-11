// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     "process.env": process.env,
//   },
// });

// https://vitejs.dev/config/
// export default defineConfig({
//   plug

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const env = loadEnv("mock", process.cwd(), "");
  const processEnvValues = {
    "process.env": Object.entries(env).reduce((prev, [key, val]) => {
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

// import { defineConfig } from "vite";
// import dotenv from "dotenv";
// import react from "@vitejs/plugin-react";

// dotenv.config(); // load env vars from .env

// export default defineConfig({
//   define: {
//     __BACKEND_URL__: `"${process.env.BACKEND_URL}"`, // wrapping in "" since it's a string
//   },
//   plugins: [react()],
// });
// import { defineConfig, loadEnv } from "vite";
