const delay = require('mocker-api/utils/delay');
const noProxy = process.env.NO_PROXY === 'true';
const user = require('./user');

const proxy = {
  ...user
}

module.exports = (noProxy ? {} : delay(proxy, 1000));