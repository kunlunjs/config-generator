/**
 * @type import('eslint').Linter.Config
 * @link https://eslint.org/docs/user-guide/configuring
 */
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
    mocha: true,
    jasmine: true,
    jest: true
  },
  plugins: [
    'simple-import-sort',
    // 'jsx-a11y',
    'n',
    'promise',
    'import'
  ],
  extends: [
    'eslint:recommended',
    <% if (jest) { %>
    'plugin:prettier/recommended',<% } %>
    // 'plugin:react/jsx-runtime'
    // 'plugin:react/recommended',
    // 'plugin:react-hooks/recommended',
    // 'plugin:jsx-a11y/recommended',
    // 'plugin:vue/vue3-recommended',
  ],
  rules: {
    'no-unused-vars': 'warn',
    // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
    'default-case': 'off',
    // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
    'no-dupe-class-members': 'off',
    // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
    'no-undef': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/export': 'error',
    'import/first': 'error',
    'import/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: false }],
    'import/no-duplicates': 'error',
    'import/no-named-default': 'error',
    'import/no-webpack-loader-syntax': 'error',

    // https://www.npmjs.com/package/eslint-plugin-n
    'n/handle-callback-err': 'error',
    'n/no-callback-literal': 'error',
    'n/no-deprecated-api': 'error',
    'n/no-exports-assign': 'error',
    'n/no-new-require': 'error',
    'n/no-path-concat': 'error',
    'n/no-unsupported-features/es-builtins': 'error',
    // 'n/no-unsupported-features/es-syntax': 'error',
    'n/no-unsupported-features/node-builtins': 'error',
    'n/process-exit-as-throw': 'error',

    // https://www.npmjs.com/package/eslint-plugin-promise
    'promise/param-names': 'error',
  },
  // settings: {
  //   react: {
  //     version: 'detect',
  //   }
  // },
  overrides: [
    <% if (jest) { %>{
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        tsconfigRootDir: process.cwd()
        // project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json']
      },
      plugins: ['@typescript-eslint'],
      rules: {
        // Add TypeScript specific rules (and turn off ESLint equivalents)
        '@typescript-eslint/consistent-type-assertions': 'warn',
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'warn',
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'warn',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'warn',
          {
            functions: false,
            classes: false,
            variables: false,
            typedefs: false
          }
        ],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true
          }
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'none',
            ignoreRestSiblings: true
          }
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'warn'
        // '@typescript-eslint/no-unused-vars': ['warn', {
        //   args: 'none',
        //   ignoreRestSiblings: true,
        // }],
        // '@typescript-eslint/no-unsafe-assignment': 'warn',
        // '@typescript-eslint/no-unsafe-call': 'warn',
        // '@typescript-eslint/no-unsafe-return': 'warn',
        // '@typescript-eslint/no-unsafe-member-access': 'warn'
      }
    }<% } %><% if (jest) { %>,
    {
      files: ['test/**', '*.spec.{js,ts}'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: { 'jest/prefer-expect-assertions': 'off' }
    }<% } %>
  ],
  ignorePatterns: ['dist', 'node_modules', '**/{public,lib,libs}/**/*.js']
}
