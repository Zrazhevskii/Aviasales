// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:react-hooks/recommended',
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   parser: '@typescript-eslint/parser',
//   plugins: ['react-refresh'],
//   rules: {
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//   },
// }

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
      'airbnb',
      // 'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.json', ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
      react: { version: '18.2' },
      'import/resolver': {
          node: {
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
      },
  },
  plugins: ['@typescript-eslint', 'react-refresh', 'react', 'import', 'jsx-a11y'],
  rules: {
      'import/no-unresolved': [2, { caseSensitive: false }],
      'react/react-in-jsx-scope': 'off',
      'import/extensions': [
          'error',
          'ignorePackages',
          {
              ts: 'never',
              tsx: 'alway',
          },
      ],
      'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'jsx-a11y/no-autofocus': 'off',
      'no-alert': 'off',
      'react/require-default-props': 0,
  },
};

