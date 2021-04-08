# 配置生成器

基础的前端项目配置生成器，适合项目初始化的时候使用，或者完善当前项目的配置。生成的配置文件只作为通用设置，具体项目仍然需要做进一步修改以适配项目需要。

[![asciicast](https://asciinema.org/a/s754q27kLEDqs3uzgr78YYVRS.svg)](https://asciinema.org/a/s754q27kLEDqs3uzgr78YYVRS)

## 使用方法

```bash
# 全局安装
npm i -g fe-conf
# 或者
yarn global add fe-conf
# 然后进行配置生成
fe-conf
# 或者跳过全局安装直接使用
npx fe-conf
```

## 生成的配置

- `babel`
- `browserslist`
- `commitlint`
- `devmoji`
- `dockerignore`
- `editorconfig`
- `eslint`
- `git`
- `husky`
- `jest`
- `license`
- `lintstaged`
- `npm`
- `nvm`
- `prettier`
- `readme`
- `stylelint`
- `typescript`
- `y2s`

## TODO

- [ ] 锁定大版本
- [ ] 丰富说明文档，收集配置说明地址
- [ ] babel preset env
