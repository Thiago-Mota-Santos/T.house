const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    "eslint-config-turbo",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  plugins: ["prettier"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    "unicorn/filename-case": "off",
    "no-console": "off",
    "import/no-named-as-default-member" : "off",
    "eslint-comments/require-description": "off",
    "prettier/prettier":[
      "error",
      {
         "printWidth": 80,
         "tabWidth": 2,
         "singleQuote": false,
         "trailingComma": "all",
         "arrowParens": "always",
         "semi": true
      }
    ]
  }
};
