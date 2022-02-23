/**
 * @type import('eslint').Linter.Config
 * @link https://eslint.org/docs/user-guide/configuring
 */
module.exports = {
  root: true,<% if (typescript) { %>
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020
  },<% } %>
  env: {
    es6: true,
    jest: true,
    // 如果不需要，可以卸载 eslint-plugin-node 和 eslint-plugin-promise 依赖
    // 如果是NodeJs项目建议在 package.json 中开启 engine 的限制
    node: true,
    browser: true,
    mocha: true,
    jasmine: true
  },
  extends: [
    'eslint:recommended',<% if (typescript) { %>
    'plugin:@typescript-eslint/recommended',<% } %><% if (prettier) { %>
    'plugin:prettier/recommended'<% } %>
  ],
  plugins: [<% if (typescript) { %>'@typescript-eslint'<% } %>, 'unused-imports', 'import'],
  rules: {
    // 'jsx-quotes': ['error', 'prefer-double']
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        alphabetize: {
          order: 'asc'
        }
      }
    ]
  }
  // overrides: [
  //   {
  //     files: ['.*.*', '*rc', '*rc.js'],
  //     rules: {
  //       'import/no-commonjs': 'off'
  //     }
  //   }
  // ]
  // settings: {
  //   react: {
  //     pragma: 'React',
  //     // React version. 'detect' automatically picks the version you have installed.
  //     // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
  //     // default to latest and warns if missing
  //     // It will default to 'detect' in the future
  //     version: 'detect',
  //   }
  // }
}
