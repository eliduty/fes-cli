module.exports = {
  // 工程化项目配置模板
  configTemplate: {
    vue2: {
      dependencies: {
        'lint-staged': ['lint-staged'],
        eslint: ['eslint', 'eslint-plugin-vue', 'eslint-plugin-prettier', 'eslint-config-prettier'],
        prettier: ['prettier'],
        stylelint: ['stylelint', 'stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-order'],
        commitlint: ['@commitlint/cli', '@commitlint/config-conventional'],
        changelog: ['standard-version'],
        'lint-staged': ['lint-staged'],
      },
      repository: 'https://gitee.com/eliduty/fes-cconfig.git#vue2',
    },
    vue3: {
      dependencies: {
        eslint: ['eslint', 'eslint-plugin-vue', 'eslint-plugin-vue', 'eslint-plugin-prettier', 'eslint-config-prettier'],
        prettier: ['prettier'],
        stylelint: ['stylelint', 'stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-order'],
        commitlint: ['@commitlint/cli', '@commitlint/config-conventional'],
        changelog: ['standard-version'],
      },
      repository: 'https://gitee.com/eliduty/fes-cconfig.git#vue3',
    },
  },
  // 初始项目配置模板
  projectTemplate: {
    'vue-element-admin': {
      repository: 'https://github.com/PanJiaChen/vue-element-admin.git',
    },
    'electron-vue-admin': {
      repository: 'https://github.com/PanJiaChen/electron-vue-admin.git',
    },
  },
};
