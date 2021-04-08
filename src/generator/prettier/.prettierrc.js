module.exports = {
  // https://prettier.io/docs/en/options.html
  parser: 'babel',
  // 一行最多 80 字符
  // printWidth: 80,
  // 使用 2 个空格缩进
  // tabWidth: 2,
  // 不使用缩进符，而使用空格
  // useTabs: false,
  // 行尾不要有分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  // quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  // jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'none',
  // 大括号内的首尾需要空格
  // bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  // jsxBracketSameLine: false,
  // 箭头函数，避免使用括号
  arrowParens: 'avoid',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  // requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  // insertPragma: false,
  // 使用默认的折行标准
  // proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  // htmlWhitespaceSensitivity: 'css',
  // 换行符使用 auto
  endOfLine: 'auto',
  // 格式化嵌入的内容
  // embeddedLanguageFormatting: 'auto',
  overrides: [
    {
      files:
        '*.{babelrc,eslintrc,huskyrc,lintstagedrc,json,prettierrc,stylelintrc}',
      options: {
        parser: 'json'
      }
    },
    {
      files: '*.{ts,tsx}',
      options: {
        parser: 'typescript'
      }
    },
    {
      files: '*.{ejs,hbs,html}',
      options: {
        parser: 'html'
      }
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue'
      }
    },
    {
      files: '*.mdx',
      options: {
        parser: 'mdx'
      }
    },
    {
      files: '*.css',
      options: {
        parser: 'css'
      }
    },
    {
      files: '*.less',
      options: {
        parser: 'less'
      }
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss'
      }
    },
    {
      files: '*.yaml',
      options: {
        parser: 'yaml'
      }
    }
  ]
}
