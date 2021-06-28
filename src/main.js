const { program } = require('commander');
const figlet = require('figlet');
const chalk = require('chalk');
const config = require('./config');
const create = require('./commands/create');

// 控制台输出logo
console.log(chalk.magenta(figlet.textSync(config.appName)));

// 注册版本查看命令
program.version(config.version);

program.command('create <name>').description('创建项目').action(create);

program.parse();
