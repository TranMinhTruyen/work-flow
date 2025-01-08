import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/*.config.mjs'],
  },
  ...fixupConfigRules(
    compat.extends(
      'next/core-web-vitals',
      'next/typescript',
      'eslint:recommended',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:@next/eslint-plugin-next'
    )
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslintEslintPlugin),
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      'no-console': 'warn',
      'no-mixed-spaces-and-tabs': 'warn',
      'no-unused-vars': [
        'warn',
        {
          args: 'none',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'none',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],

      'prettier/prettier': 'warn',
    },
  },
];
