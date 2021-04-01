module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'eslint-plugin-prettier' plugin ships with a plugin:prettier/recommended config that sets up both 'eslint-plugin-prettier' plugin and eslint-config-prettier in one go.
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // 'jsx-quotes': ['error', 'prefer-double'],
    '@typescript-eslint/no-non-null-assertion': 0,
  },
  // overrides: [
  //   {
  //     files: ['config/*.js'],
  //     rules: {
  //       'import/no-commonjs': 'off',
  //     },
  //   },
  // ],
}
