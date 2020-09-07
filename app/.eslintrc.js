module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'react/jsx-filename-extension': [2, { 'extensions': ['.tsx'] }],
    'react/jsx-props-no-spreading': 0,
    'import/no-named-as-default': 0
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"]
      },
      typescript: {
        project: '.',
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    }
  },
};
