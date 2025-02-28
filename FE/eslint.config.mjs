import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  { ignores: ['**/*.config.cjs', 'vite.config.ts'], files: ['**/*.ts', '**/*.tsx'] },
  ...compat.config({
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
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
      'react',
      'react-hooks',
      'eslint-plugin-prettier',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint',
      'import',
    ],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
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
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'none',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': [
        'warn',
        {
          semi: true,
          tabWidth: 2,
          useTabs: false,
          printWidth: 100,
          singleQuote: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          bracketSameLine: false,
          arrowParens: 'avoid',
          'no-mixed-spaces-and-tabs': ['warn'],
          'no-unused-vars': ['warn'],
          endOfLine: 'auto',
        },
      ],
    },
  }),
];

export default eslintConfig;
