import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  { ignores: ['**/*.config.mjs'], files: ['**/*.ts', '**/*.tsx'] },
  ...compat.config({
    extends: [
      'next',
      'next/core-web-vitals',
      'next/typescript',
      'eslint:recommended',
      'next/core-web-vitals',
      'prettier',
      'plugin:@next/next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: ['./tsconfig.json'],
    },
    plugins: [
      'eslint-plugin-prettier',
      '@typescript-eslint/eslint-plugin',
      '@next/eslint-plugin-next',
      '@typescript-eslint',
      'import',
    ],
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
  }),
];

export default eslintConfig;
