import * as path from 'path';
import { defineConfig } from "vite";

const lib_name = "jsaltt";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib.mts"),
      name: lib_name,
      fileName: (format) => `${lib_name}.${format}.js`
    }
  }
});
