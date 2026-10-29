// ESLint flat config (ESLint v9+)
import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["public/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.browser,
        module: "readonly"
      }
    },
    rules: {
      // Required semicolons: omitting one fails the build
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "no-unused-vars": "error",
      "eqeqeq": "error"
    }
  }
];
