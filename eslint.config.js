import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["src/**/*.ts", "src/**/*.tsx"],
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                ecmaFeatures: { jsx: true },
            },
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "no-var": "off",
        },
    },
    {
        files: ["src/types/**/*.d.ts"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "no-var": "off",
        },
    },
    {
        ignores: ["dist/", "node_modules/", "rollup.config.js", "rollup.test.config.js"],
    }
);
