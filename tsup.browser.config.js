import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts", "src/preview.ts", "src/manager.ts", "src/preset.ts"],
  splitting: false,
  minify: !options.watch,
  format: ["cjs", "esm"],
  external: ["react", "react-dom", "react-is", "prop-types"],
  dts: {
    resolve: true,
  },
  treeshake: true,
  sourcemap: true,
  clean: true,
  platform: "browser",
  esbuildOptions(options) {
    options.conditions = ["module"];
  },
}));
