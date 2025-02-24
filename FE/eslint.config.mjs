import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  { ignores: ['**/*.config.cjs'], files: ['**/*.ts', '**/*.tsx'] },
  ...compat.config({
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: ['./tsconfig.app.json'],
    },
    plugins: [
      'eslint-plugin-prettier',
      '@typescript-eslint/eslint-plugin',
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
