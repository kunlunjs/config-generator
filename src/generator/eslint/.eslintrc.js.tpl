module.exports = {<% if (typescript) { %>
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020
  },<% } %>
  env: {
    es6: true,
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
  plugins: [<% if (typescript) { %>'@typescript-eslint'<% } %>],
  rules: {
    // 'jsx-quotes': ['error', 'prefer-double']
  },
  // overrides: [
  //   {
  //     files: ['config/*.js'],
  //     rules: {
  //       'import/no-commonjs': 'off',
  //     }
  //   }
  // ]
}
