const downloadGit = require('download-git-repo');

/**
 * git仓库下载 （https://www.npmjs.com/package/download-git-repo）
 * @param {*} repository git地址
 * @param {*} destination 下载位置
 * @param {*} options 配置
 * @returns
 */
function download(repository, destination, options = { clone: true }) {
  return new Promise((resolve, reject) => {
    downloadGit(`direct:${repository}`, destination, options, err => {
      err ? reject(err) : resolve(err);
    });
  });
}

module.exports = {
  download,
};
