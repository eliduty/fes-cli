const { join } = require('path');
const { writeFileSync } = require('fs');
const { success } = require('../utils/log');
const { configFileName } = require('../config');

const init = async () => {
  const defaultContent = {
    configTemplate: {},
    projectTemplate: {}
  };
  createConfig(join(process.cwd(), configFileName), defaultContent);
  success('初始化成功！');
};

function createConfig(path, obj = {}) {
  const content = `module.exports = ${JSON.stringify(obj, null, 2)}`;
  writeFileSync(path, content);
}
module.exports = init;
