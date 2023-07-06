module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:css/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    schema: './**/*.graphql',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['css', 'prettier', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    semi: 'error',
    'prettier/prettier': ['error'],
  },
  overrides: [
    {
      files: ['./src/**/*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        '@graphql-eslint/known-type-names': 'error',
      },
    },
  ],
};
