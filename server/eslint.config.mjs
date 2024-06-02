import globals from "globals";
import pluginJs from "@eslint/js";
import pluginSimpleImport from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";


export default [
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      simpleImport: pluginSimpleImport,
      rules: {
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": "error",
      }
    }
  },
  ...tseslint.configs.recommended,
  {
    ignores: ["**/node_modules/**", "public/**", "build/**"]
  }
];
