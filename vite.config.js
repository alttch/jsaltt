import * as path from 'path';
import { defineConfig } from "vite";

const lib_name = "jsaltt";

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib.ts"),
      name: lib_name,
      fileName: (format) => `${lib_name}.${format}.js`
    }
  }
});
