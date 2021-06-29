const download = require('download-git-repo');

/**
 * git仓库下载 （https://www.npmjs.com/package/download-git-repo）
 * @param {*} repository git地址
 * @param {*} destination 下载位置
 * @param {*} options 配置
 * @returns
 */
function clone(repository, destination, options = { clone: true }) {
  return new Promise((resolve, reject) => {
    download(`direct:${repository}`, destination, options, err => {
      err ? reject(err) : resolve(err);
    });
  });
}

module.exports = {
  clone,
};
