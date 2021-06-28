const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');
const log = require('../utils/log');
const { download } = require('../utils');
const { checkGit, checkFileName, checkFileExist } = require('../utils/validate');

const create = async (name, options) => {
  const gitUrl = 'https://github.com/eliduty/fes.git#main';
  const destination = `E:/test/fes-cli-test/${name}`;
  const path = shell.pwd();
  // 检查git是否可用
  if (!checkGit()) return log.error('Git不可用，请安装Git后再试！');
  // 检查参数是否合法
  if (checkFileName(name)) return log.error('项目名称存在非法字符！');
  // 检查目录是否存在
  if (checkFileExist(destination)) return log.error(`${name}目录已存在！`);

  const spinner = ora('正在下载模板...').start();
  const err = await download(gitUrl, destination);
  if (err) {
    spinner.fail();
    log.error(`下载文件出错，请检查网络是否正常！`);
  } else {
    spinner.succeed(chalk.green('模板下载成功！'));
  }




  // log.error(chalk.red(123123));
  // ora().fail(chalk.red(123123));
  // console.log(chalk.underline.blueBright.bold(123123123));
  // // ora().fail(chalk.red('失败'));
  // const spinner = ora('正在下载模板...').start();
  // setTimeout(() => {
  //   spinner.fail(chalk.red('失败'));
  // }, 1000);

  // const spinner = ora('Loading unicorns').start();

  // setTimeout(() => {
  //   spinner.color = 'yellow';
  //   spinner.text = 'Loading rainbows';
  // }, 1000);
};

module.exports = create;
