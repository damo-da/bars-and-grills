module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    "__DEV__": false,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  settings: {
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'no-console': 'error',
    "react/prop-types": ["error", { "ignore": ["navigation"] }],
    "no-bitwise": ["error", { "allow": ["~"] }],
    "import/prefer-default-export": 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
