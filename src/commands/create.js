const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');
const merge = require('deepmerge');
const inquirer = require('inquirer');
const { join } = require('path');
const { configFileName } = require('../config');
const { success, error } = require('../utils/log');
const { clone } = require('../utils/git');
const { checkGit, checkFileName, checkFileExist } = require('../utils/validate');
let fesConfig = require('../config/fes.config');
const create = async (name, options) => {
  const pwd = process.cwd();
  const destination = join(pwd, name);
  // 检查git是否可用
  if (!checkGit()) return error('Git不可用，请安装Git后再试！');
  // 检查参数是否合法
  if (checkFileName(name)) return error('项目名称存在非法字符！');
  // 检查目录是否存在
  if (checkFileExist(destination)) return error(`${name}目录已存在！`);

  let extendConfigPath = join(pwd, configFileName);
  if (checkFileExist(extendConfigPath)) {
    // 动态加载项目配置
    let extendConfig = require(extendConfigPath);
    fesConfig = merge(fesConfig, extendConfig);
  }
  let templateList = Object.keys(fesConfig.projectTemplate);
  let templateName = templateList[0];
  if (templateList.length > 1) {
    const templateQuestion = [
      {
        type: 'list',
        name: 'project',
        message: '请选择创建的项目配置模板',
        choices: templateList,
      },
    ];
    const templateAnswers = await inquirer.prompt(templateQuestion);
    templateName = templateAnswers.project;
  }
  // 配置仓库地址
  const templateGitRepository = fesConfig.projectTemplate[templateName].repository;
  await downloadTemplate(templateGitRepository, destination);
  // 下载成功进入项目目录
  shell.cd(destination);
  installDependencies();

  success('\n\n恭喜，项目创建成功！\n\n');
};
async function downloadTemplate(source, target) {
  const spinner = ora('正在下载模板...').start();
  const err = await clone(source, target);
  if (err) {
    spinner.fail(chalk.red('下载文件出错，请检查网络是否正常！'));
    shell.exit(1);
  }
  spinner.succeed(chalk.green('模板下载成功！'));
}

function installDependencies() {
  const spinner = ora('正在安装依赖...\n').start();
  if (shell.exec('npm install').code !== 0) {
    spinner.fail(chalk.red('依赖安装失败，请手动执行`npm install`！'));
    shell.exit(1);
  }
  spinner.succeed(chalk.green('依赖安装成功！'));
}

module.exports = create;
