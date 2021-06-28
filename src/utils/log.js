const chalk = require('chalk');
const ora = require('ora');
function log(data) {
  console.log(data);
}
log.success = (...txt) => ora().succeed(chalk.green(...txt));
log.info = (...txt) => ora().info(chalk.blue(...txt));
log.warn = (...txt) => ora().warn(chalk.yellow(...txt));
log.error = (...txt) => ora().fail(chalk.red(...txt));
module.exports = log;
