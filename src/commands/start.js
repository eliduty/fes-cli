const merge = require('deepmerge');
const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { readFileSync,writeFileSync } = require('fs');
const { copySync, removeSync } = require('fs-extra');
const { join } = require('path');
const { checkGit, checkNpmInit, checkGitInit, checkHuskyInit, checkFileExist, checkFileName } = require('../utils/validate');
const { success, error } = require('../utils/log');
const { clone } = require('../utils/git');
const { configFileName } = require('../config');
const { exec, exit, cd, mkdir, which } = require('shelljs');

let fesConfig = require('../config/fes.config');

const start = async name => {
  if (!checkGit()) return error('Git不可用，请安装Git后再试！');
  if (name) {
    // 检查参数是否合法
    if (checkFileName(name)) return error('项目名称存在非法字符！');
    // 检查目录是否存在
    if (checkFileExist(join(process.cwd(), name))) return error(`${name}目录已存在！`);
    mkdir('-p', name);
    cd(name);
  }
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
  // !checkHuskyInit() && huskyInit();

  // 安装项目依赖
  installDependencies(dependencies);

  // 设置script命令
  setScript();

  // git下载配置模板 git下载到临时目录防止git冲突
  await downloadTemplate(templateGitRepository, configTempPath);

  // 删除临时目录
  removeTempDir(configTempPath);

  success('\n\n恭喜，项目创建成功！\n\n');

  // vscode 编辑器打开项目
  if (which('code')) exec('code ./');
  exit(0);
};

/**
 * npm 初始化
 */
function npmInit() {
  const spinner = ora('正在初始化npm...\n').start();
  if (exec('npm init -y').code !== 0) {
    spinner.fail(chalk.red('npm初始化失败，请手动执行 `npm init -y`'));
    exit(1);
  }
  spinner.succeed(chalk.green('npm初始化成功！'));
}

/**
 * git 初始化
 */
function gitInit() {
  const spinner = ora('正在初始化git\n').start();
  if (exec('git init').code !== 0) {
    spinner.fail(chalk.red('git初始化失败，请手动执行 `git init`'));
    exit(1);
  }
  spinner.succeed(chalk.green('git初始化成功！'));
}

/**
 * husky 初始化
 */
async function huskyInit() {
  const pwd = process.cwd();
  const spinner = ora('正在初始化husky\n').start();
  if (exec('npm install -D husky@4.3.8 && npx husky install').code !== 0) {
    spinner.fail(chalk.red('husky初始化失败，请手动执行 `npm install -D husky@4.3.8 && npx husky install`'));
    exit(1);
  }
  copySync(join(__dirname, '../git-hooks'), join(pwd, '.husky/'));
  spinner.succeed(chalk.green('husky初始化成功！'));
}

/**
 * 安装依赖
 */
function installDependencies(dependencies) {
  const spinner = ora('正在安装项目依赖...\n').start();
  if (exec(`npm install -D ${dependencies.join(' ')}`).code !== 0) {
    spinner.fail(chalk.red('项目依赖安装失败！'));
    exit(1);
  }
  spinner.succeed(chalk.green('项目依赖安装成功！'));
}

/**
 * git下载配置模板
 * @param {*} source
 * @param {*} target
 */
async function downloadTemplate(source, target) {
  // git下载配置模板
  const spinner = ora('正在下载配置模板...\n').start();
  try {
    await clone(source, target);
    spinner.succeed(chalk.green('配置模板下载成功！'));
  } catch (error) {
    spinner.fail(chalk.red(`下载配置模板，错误信息：【${error.message}】`));
    exit(1);
  }
}

/**
 * 删除临时目录
 */
function removeTempDir(target) {
  const pwd = process.cwd();
  // 拷贝所有临时目录的文件到项目目录
  copySync(target, pwd);
  removeSync(target);
}

function setScript() {
  const pwd = process.cwd();
  let pkg = readFileSync(join(pwd, 'package.json'), 'utf8');
  pkg = JSON.parse(pkg);
  pkg.scripts.release = "standard-version -i docs/CHANGELOG.md";
  writeFileSync(join(pwd, 'package.json'), JSON.stringify(pkg,'','\t'), { encoding: 'utf8' });
  // exec(`npm set-script release "standard-version -i docs/CHANGELOG.md"`);
}

module.exports = start;
