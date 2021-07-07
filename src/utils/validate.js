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
 * 检查当前目录是否有package.json
 * @returns
 */
 function checkNpmInit() {
  return checkFileExist('package.json');
}

/**
 * 检查git是否初始化
 * @returns
 */
function checkGitInit() {
  return checkFileExist('.git')
}

/**
 * 检查husky是否初始化
 * @returns
 */
function checkHuskyInit() {
  return checkFileExist('.husky')
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
  checkFileExist,
  checkNpmInit,
  checkGitInit,
  checkHuskyInit
};
