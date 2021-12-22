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
        'ls-lint':['@ls-lint/ls-lint']
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
        'ls-lint':['@ls-lint/ls-lint']
      },
      repository: 'https://github.com/eliduty/fes-config.git#vue3',
    },
    'vue3-ts': {
      dependencies: {
        husky:['husky@4.3.8'],
        'lint-staged': ['lint-staged'],
        eslint: ['eslint', 'eslint-plugin-vue', 'eslint-plugin-vue', 'eslint-plugin-prettier', 'eslint-config-prettier'],
        prettier: ['prettier'],
        stylelint: ['stylelint', 'stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-order'],
        commitlint: ['@commitlint/cli', '@commitlint/config-conventional'],
        changelog: ['standard-version'],
        'ls-lint':['@ls-lint/ls-lint']
      },
      repository: 'https://github.com/eliduty/fes-config.git#vue3-ts',
    }
  },
  // fes create 项目配置模板
  projectTemplate: {
    'vue-element-admin': {
      repository: 'https://github.com/PanJiaChen/vue-element-admin.git',
    },
    'ant-design-vue-pro': {
      repository: 'https://github.com/vueComponent/ant-design-vue-pro.git',
    },
  },
};
