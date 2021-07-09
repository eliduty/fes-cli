const { program } = require('commander');
const figlet = require('figlet');
const chalk = require('chalk');
const config = require('./config');

const create = require('./commands/create');
const start = require('./commands/start');
const init = require('./commands/init');

// 控制台输出logo
console.log(chalk(figlet.textSync(config.appName)));

// 注册版本查看命令
program.version(config.version,'-v, --version');

program.command('init').description('fes初始化，生成配置文件。').action(init);
program.command('start [name]').description('添加前端工程化配置，name为可选参数，不设置为当前目录。').action(start);
program.command('create <name>').description('创建新项目，name为项目文件夹名称。').action(create);
program.parse();
