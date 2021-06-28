const ora = require('ora');
const download = require('download-git-repo');
module.exports = {
  clone: (remote, name, option) => {
    const spinner = ora('开始下载...').start();
    return new Promise((resolve, reject) =>
      download(remote, name, option, err => {
        if (err) {
          spinner.fail();
          logError(err);
          return reject(err);
        }
        spinner.succeed(chalk.green('下载完成！'));
        resolve();
      })
    );
  },
};
