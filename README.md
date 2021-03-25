# 配置生成器
基础的前端项目配置生成器，适合项目初始化的时候使用，或者完善当前项目的配置。生成的配置文件只作为通用设置，具体项目仍然需要做进一步修改以适配项目需要。

## 使用方法
```bash
# 全局安装
npm i -g @kunlun/gconf
# 或者
yarn global add @kunlun/gconf
# 然后进行配置生成
kl-conf
# 或者跳过全局安装直接使用
npx kl-conf
```

## 生成的配置
- `babel`
- `browserlist`
- `commitlint`
- `dockerignore`
- `editorconfig`
- `eslint`
- `gitignore`
- `npmrc`
- `nvmrc`
- `license`
- `lintstage`
- `prettier`
- `readme`
- `stylelint`
- `y2s`
- `tsconfig`
- `husky`
- `jest`