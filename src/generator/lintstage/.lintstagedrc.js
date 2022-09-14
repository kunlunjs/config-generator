/**
 * @link https://www.npmjs.com/package/lint-staged
 */
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix --quiet'],
  '*.{css,less,styl,scss,sass}': ['stylelint --fix --quiet'],
  '*.!(js|jsx|ts|tsx|css|less|styl|scss|sass)': ['prettier --write']
}
