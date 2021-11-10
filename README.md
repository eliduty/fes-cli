# fes-cli ![npm](https://img.shields.io/npm/dt/@eliduty/fes-cli)![npm](https://img.shields.io/npm/v/@eliduty/fes-cli)
## 介绍

[fes](https://github.com/eliduty/fes-cli)(frontend starter)为前端项目开发脚手架，主要提供了以下功能：

1. 快速为项目创建、添加、更新前端工程化相关的配置功能，包括[eslint](https://eslint.bootcss.com/)、[prettier](https://prettier.io/)、[stylelint](https://stylelint.io/)、[commitlint](https://commitlint.js.org/)、[lint-staged](https://www.npmjs.com/package/lint-staged)、[standard-version](https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.1.0/README.md)、[editorConfig](https://editorconfig.org/)，支持自定义添加功能。
2. 基于git仓库模板，快速创建项目。脚手架内置已内置两个优秀的项目模板：[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin.git)和[ant-design-vue-pro](https://github.com/vueComponent/ant-design-vue-pro.git)，支持自定义添加项目模板。

## 安装

建议采用全局安装的方式。

```
npm i -g @eliduty/fes-cli
```

## 命令

- 查看版本

  ```
  fes -v
  ```

- 查看帮助

  ```
  fes -h
  ```

- 初始化项目配置

  ```
  fes init
  # 执行命令后会在当前目录生成fes.config.js
  ```

- 创建、添加、更新工程化配置到项目

  ```
  # 为项目添加工程化配置，
  # name为可选参数，name为空时在当前目录创建、添加、更新工程化配置；name有值时则在当前目录以name为名创建文件夹并添加工程化配置。
  fes start [name]
  ```

- 创建项目

  ```
  # 以git仓库为模板，快速创建项目，name为项目名称，会以此为名创建项目文件夹。
  fes create <name>
  ```

## 自定义配置

#### 1. 自定义工程化配置

由于脚手架内置的工程化配置并不能完全满足各个团队的需要，各个团队在开发工具、开发习惯、开发规范上也各不相同。因此脚手架提供了一个参考配置仓库[fes-config](https://github.com/eliduty/fes-config)，可fork此仓库进行团队规范定制化。

配置仓库管理方式建议按照[fes-config](https://github.com/eliduty/fes-config)的管理方式进行管理，默认分支提供仓库使用说明文档，在根据团队的需要创建分支进行项目配置管理，比如：vue2、vue3、react...等项目工程化的配置有所不同，可以使用分支进行管理，一个分支代表一种项目的通用配置。

#### 2. 生成项目配置文件

执行`fes init`会自动在命令行所在目录生成`fes.config.js`配置文件，配置文件支持的选项对象如下：

| 配置名称        | 命令         | 说明                                                         |
| --------------- | ------------ | ------------------------------------------------------------ |
| configTemplate  | `fes start`  | 配置`fes start`命令选项，[fes-cli](https://github.com/eliduty/fes-cli)提供了vue2、vue3的配置选项。 |
| projectTemplate | `fes create` | 配置`fes create`创建的仓库命令行选项，[fes-cli](https://github.com/eliduty/fes-cli)提供了[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin.git)、[ant-design-vue-pro](https://github.com/vueComponent/ant-design-vue-pro.git)模板 |

fes-cli 内置配置参考：

```javascript
module.exports = {
  // fes start 工程化项目配置模板
  configTemplate: {
    vue2: {
      dependencies: {
        husky:['husky@4.3.8'],
        'lint-staged': ['lint-staged'],
        eslint: ['eslint', 'eslint-plugin-vue', 'eslint-plugin-prettier', 'eslint-config-prettier'],
        prettier: ['prettier'],
        stylelint: ['stylelint', 'stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-order'],
        commitlint: ['@commitlint/cli', '@commitlint/config-conventional'],
        changelog: ['standard-version'],
        //...
        //此处可以增加项目配置模板依赖
      },
      repository: 'https://github.com/eliduty/fes-config.git#vue2',
    },
    vue3: {
      dependencies: {
        husky:['husky@4.3.8'],
        'lint-staged': ['lint-staged'],
        eslint: ['eslint', 'eslint-plugin-vue', 'eslint-plugin-vue', 'eslint-plugin-prettier', 'eslint-config-prettier'],
        prettier: ['prettier'],
        stylelint: ['stylelint', 'stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-order'],
        commitlint: ['@commitlint/cli', '@commitlint/config-conventional'],
        changelog: ['standard-version'],
        //...
        //此处可以增加项目配置模板依赖
      },
      repository: 'https://github.com/eliduty/fes-config.git#vue3',
    },
    //...
    //此处可以增加更多的工程化配置模板
  },
  // fes create 项目模板
  projectTemplate: {
    'vue-element-admin': {
      repository: 'https://github.com/PanJiaChen/vue-element-admin.git',
    },
    'ant-design-vue-pro': {
      repository: 'https://github.com/vueComponent/ant-design-vue-pro.git',
    },
    //...
    //此处可以增加项目模板
  },
};


```

**注意：** repository为模板的git地址#号后为分支名称。

## 说明

- 模板下载需要使用git，客户端须先安装[git](https://git-scm.com/downloads)后，方可使用该工具。
- 项目名称仅支持大小写字母、数字、_、-。
- `fes start`命令可以直接从配置仓库中下载配置更新项目配置，若项目中对配置进行了修改，执行命令后会覆盖配置，注意：配置文件的备份或始终保持在仓库中更新配置。
- 在网络通畅的情况下，工具支持私有化仓库下载模板。
- fes.config.js文件生效路径为终端所在路径，并非一定在项目路径下。
- 使用[fes-cli](https://github.com/eliduty/fes-cli)时，请确保[npm](https://www.npmjs.com/)访问正常，避免依赖安装失败。

## 常见问题
#### 问题1：在项目安装过程中出现“下载配置模板，错误信息：【git clone failed with code 128】”。

造成此问题的原因一般是由于仓库权限或网络问题，造成git无法访问。

**解决办法：** 可使用自定义配置切换仓库为国内镜像仓库。

1. 执行`fes init`生成配置文件。

2. 再配置文件中写入一下内容。

```javascript
module.exports = {
  configTemplate: {
    vue2: {
      repository:"https://gitee.com/eliduty/fes-config.git#vue2"
    },
    vue3: {
      repository:"https://gitee.com/eliduty/fes-config.git#vue3"
    }
  },
  projectTemplate: {
    'vue-element-admin': {
      repository: 'https://gitee.com/PanJiaChen/vue-element-admin.git'
    },
    'ant-design-pro-vue': {
      repository:'https://gitee.com/sendya/ant-design-pro-vue.git'
    }
  }
};

```
