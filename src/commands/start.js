const { copySync, removeSync } = require('fs-extra');
const { join } = require('path');
const { checkGit, checkNpmInit, checkGitInit, checkHuskyInit, checkFileExist } = require('../utils/validate');
const { success, error } = require('../utils/log');
const { clone } = require('../utils/git');
const { configFileName } = require('../config');
const shell = require('shelljs');
const merge = require('deepmerge');
const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('inquirer');

let fesConfig = require('../config/fes.config');

const start = async () => {
  if (!checkGit()) return error('Git不可用，请安装Git后再试！');
  const pwd = process.cwd();
  let extendConfigPath = join(pwd, configFileName);
  if (checkFileExist(extendConfigPath)) {
    // 动态加载项目配置
    let extendConfig = require(extendConfigPath);
    fesConfig = merge(fesConfig, extendConfig);
  }

  let templateList = Object.keys(fesConfig.configTemplate);
  let templateName = templateList[0];
  if (templateList.length > 1) {
    const templateQuestion = [
      {
        type: 'list',
        name: 'template',
        message: '请选择项目配置模板',
        choices: templateList,
      },
    ];
    const templateAnswers = await inquirer.prompt(templateQuestion);
    templateName = templateAnswers.template;
  }
  // 配置依赖项
  const dependencies = Object.values(fesConfig.configTemplate[templateName].dependencies).flat();
  // 配置仓库地址
  const templateGitRepository = fesConfig.configTemplate[templateName].repository;

  const configTempPath = join(pwd, 'fes_temp');
  // 清除临时目录
  removeSync(configTempPath);

  // 检查npm 是否初始化
  !checkNpmInit() && npmInit();

  // 检查git是否初始化
  !checkGitInit() && gitInit();

  // 安装husky
  !checkHuskyInit() && huskyInit();

  // 安装项目依赖
  installDependencies(dependencies);

  // git下载配置模板
  await downloadTemplate(templateGitRepository, configTempPath);

  success('\n\n恭喜，项目创建成功！\n\n');
};

/**
 * npm 初始化
 */
function npmInit() {
  const spinner = ora('正在初始化npm...\n').start();
  if (shell.exec('npm init -y').code !== 0) {
    spinner.fail(chalk.red('npm初始化失败，请手动执行 `npm init -y`'));
    shell.exit(1);
  }
  spinner.succeed(chalk.green('npm初始化成功！'));
}

/**
 * git 初始化
 */
function gitInit() {
  const spinner = ora('正在初始化git\n').start();
  if (shell.exec('git init').code !== 0) {
    spinner.fail(chalk.red('git初始化失败，请手动执行 `git init`'));
    shell.exit(1);
  }
  spinner.succeed(chalk.green('git初始化成功！'));
}

/**
 * husky 初始化
 */
async function huskyInit() {
  const pwd = process.cwd();
  const spinner = ora('正在初始化husky\n').start();
  if (shell.exec('npm install -D husky && npx husky install').code !== 0) {
    spinner.fail(chalk.red('husky初始化失败，请手动执行 `npm install -D husky && npx husky install`'));
    shell.exit(1);
  }
  copySync(join(__dirname, '../git-hooks'), join(pwd, '.husky/'));
  spinner.succeed(chalk.green('husky初始化成功！'));
}

/**
 * 安装依赖
 */
function installDependencies(dependencies) {
  const dependenciesSpinner = ora('正在安装项目依赖...\n').start();
  if (shell.exec(`npm install -D ${dependencies.join(' ')}`).code !== 0) {
    dependenciesSpinner.fail(chalk.red('项目依赖安装失败！'));
    shell.exit(1);
  }
  dependenciesSpinner.succeed(chalk.green('项目依赖安装成功！'));
}

/**
 * git下载配置模板
 * @param {*} source
 * @param {*} target
 */
async function downloadTemplate(source, target) {
  const pwd = process.cwd();
  // git下载配置模板
  const downloadSpinner = ora('正在下载配置模板...\n').start();
  // git下载到临时目录防止git冲突
  const err = await clone(source, target);
  if (err) {
    downloadSpinner.fail(chalk.red(`配置下载模板出错，请检查网络是否正常！`));
    shell.exit(1);
  }
  // 拷贝所有临时目录的文件到项目目录
  copySync(target, pwd);
  removeSync(target);
  downloadSpinner.succeed(chalk.green('配置模板下载成功！'));
}

module.exports = start;
