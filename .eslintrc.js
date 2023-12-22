module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'import', '@typescript-eslint', '@babel'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx', '.ts'] }],
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/function-component-definition': [
      2,
      { namedComponents: ['arrow-function', 'function-declaration'] },
    ],
    'prefer-destructuring': ['error', { object: false, array: false }],
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'react-native/no-single-element-style-arrays': 2,
    'react/jsx-no-bind': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-unused-styles': 2,
    camelcase: ['error', { allow: ['unstable_settings'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'no-use-before-define': ['error', { variables: false }],
    'react/no-unescaped-entities': 0,
    'react/require-default-props': 'off',
    'import/no-named-as-default': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        paths: ['.'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
