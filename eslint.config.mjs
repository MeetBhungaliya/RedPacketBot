import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['!node_modules/', 'node_modules/*', 'dist', 'src/types/*'],
  },
  {
    rules: {
      'no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
      'no-undef': 'error',
      'prettier/prettier': 'error',
    },
  },
  {
    plugins: { prettier },
  },
];
