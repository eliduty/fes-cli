const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');
const log = require('../utils/log');
const { clone } = require('../utils/git');
const { checkGit, checkFileName, checkFileExist } = require('../utils/validate');

const create = async (name, options) => {
  const gitUrl = 'https://gitee.com/eliduty/fes.git#main';
  const destination = `E:/test/fes-cli-test/${name}`;
  const path = shell.pwd();
  // 检查git是否可用
  if (!checkGit()) return log.error('Git不可用，请安装Git后再试！');
  // 检查参数是否合法
  if (checkFileName(name)) return log.error('项目名称存在非法字符！');
  // 检查目录是否存在
  if (checkFileExist(destination)) return log.error(`${name}目录已存在！`);

  const spinner = ora('正在下载模板...').start();
  const err = await clone(gitUrl, destination);
  if (err) {
    spinner.fail();
    log.error(`下载文件出错，请检查网络是否正常！`);
  } else {
    spinner.succeed(chalk.green('模板下载成功！'));
  }
  shell.cd(destination);

  // TODO:package 文件对比

  const installSpinner = ora('正在安装依赖...').start();
  if (shell.exec('npm install').code !== 0) {
    console.log(symbols.warning, chalk.yellow('自动安装失败，请手动安装！'));
    installSpinner.fail();
    shell.exit(1);
  }
  installSpinner.succeed(chalk.green('依赖安装成功！'));
  log.success('恭喜，项目创建成功！');
};

module.exports = create;
