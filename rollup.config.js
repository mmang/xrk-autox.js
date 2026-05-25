import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";

const isProd = process.env.NODE_ENV === "production";

const plugins = [
    typescript({
        outDir: "dist",
    }),
    resolve(),
    commonjs(),
    json(),
    babel({
        babelHelpers: "bundled",
        extensions: [".js", ".ts", ".tsx"],
        exclude: "node_modules/**",
        presets: ["@babel/preset-env"],
    }),
];

if (isProd) {
    plugins.push(terser({
        format: { comments: false, preamble: '"ui";' },
    }));
}

export default {
    input: "src/main.ts",
    output: {
        file: "dist/main.js",
        format: "iife",
        exports: "auto",
        banner: '"ui";\n',
    },
    plugins,
};
