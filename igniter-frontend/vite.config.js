import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   global: "globalThis",
  //   "process.env": {},
  // },
  // resolve: {
  //   alias: [
  //     {
  //       find: 'web3',
  //       replacement: 'web3/dist/web3.min.js',
  //     },
  //   ],
  // },
  // optimizeDeps: {
  //   exclude: ['node_modules'],
  //   esbuildOptions: {
  //     target: "es2020",
  //     define: {
  //       global: 'globalThis'
  //     },
  //     supported: {
  //       bigint: true
  //     },
  //   },
  // },
  // build: {
  //   target: 'es2020', // you can also use 'es2020' here
  // },
  // externals: {
  //   "react-native": true,
  // },
});