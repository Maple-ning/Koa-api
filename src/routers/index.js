const router = require('koa-router')();
const { apiPrefix } = require('../config/index');

const user = require('./user');

router.prefix(apiPrefix);

router.use('/user', user.routes(), user.allowedMethods());

module.exports = router;