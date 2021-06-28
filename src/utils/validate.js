const shell = require('shelljs');
const fs = require('fs');

/**
 * 检查git 是否安装
 * @returns
 */
function checkGit() {
  if (shell.which('git')) return true;
  return false;
}

/**
 * 检查文件名称是否合法
 * @param {*} val
 * @returns
 */
function checkFileName(val) {
  return /[^A-Za-z0-9_-]/g.test(val);
}

/**
 * 检查文件是否存在
 * @param {*} file
 * @returns
 */
function checkFileExist(file) {
  return fs.existsSync(file);
}

module.exports = {
  checkGit,
  checkFileName,
  checkFileExist
};
