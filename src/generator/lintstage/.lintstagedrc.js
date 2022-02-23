/**
 * @link https://www.npmjs.com/package/lint-staged
 */
module.exports = {
  '*.{js,ts,tsx}': ['eslint . --fix'],
  '*.{css,less,styl,scss,sass}': ['stylelint --fix']
}
