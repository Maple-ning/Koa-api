const db = require('../db/modules/user');
const tool = require('../utils/tool');
const tokenHelper = require('../utils/token-helper');
const ApiError = require('../error/api_error');
const ApiErrorNames = require('../error/api_error_name');

/**
 * 查
 */
exports.find = async (ctx) => {
  let result;
  const reqQuery = ctx.query;

  if (reqQuery && !tool.isEmptyObject(reqQuery)) {
    if (reqQuery.id) {
      result = db.findById(reqQuery.id);
    } else {
      result = db.findSome(reqQuery);
    }
  } else {
    result = db.findAll();
  }

  await result.then((res) => {
    if (res) {
      ctx.body = res;
    } else {
      throw new ApiError(ApiErrorNames.UNEXIST_ID);
    }
  }).catch((err) => {
    throw new ApiError(err.name, err.message);
  });
};

/**
 * 查 动态路由 id
 */
exports.detail = async (ctx) => {
  const { id } = ctx.params;
  if (!tool.validatorsFun.numberAndCharacter(id)) {
    throw new ApiError(ApiErrorNames.LEGAL_ID);
  }
  await db.findById(id).then((res) => {
    if (res) {
      ctx.body = res;
    } else {
      throw new ApiError(ApiErrorNames.UNEXIST_ID);
    }
  }).catch((err) => {
    throw new ApiError(err.name, err.message);
  });
};

/**
 * 添加
 */
exports.add = async (ctx) => {
  const dataObj = ctx.request.body;

  await db.add(dataObj).then((res) => {
    ctx.body = res;
  }).catch((err) => {
    throw new ApiError(err.name, err.message);
  });
};

/**
 * 更新
 */
exports.update = async (ctx) => {
  const ctxParams = ctx.params;
  // 合并 路由中的参数 以及 发送过来的参数
  // 路由参数 以及发送的参数可能都有 id 以 发送的 id 为准，如果没有，取路由中的 id
  const dataObj = { ...ctxParams, ...ctx.request.body };

  await db.update(dataObj).then((res) => {
    if (res) {
      ctx.body = res;
    } else {
      throw new ApiError(ApiErrorNames.UNEXIST_ID);
    }
  }).catch((err) => {
    throw new ApiError(err.name, err.message);
  });
};

/**
 * 删除
 */
exports.delete = async (ctx) => {
  const ctxParams = ctx.params;
  // 合并 路由中的参数 以及 发送过来的参数
  // 路由参数 以及发送的参数可能都有 id 以 发送的 id 为准，如果没有，取路由中的 id
  const dataObj = { ...ctxParams, ...ctx.request.body };
  if (!tool.validatorsFun.numberAndCharacter(dataObj.id)) {
    throw new ApiError(ApiErrorNames.LEGAL_ID);
  }

  await db.delete(dataObj.id).then((res) => {
    if (res) {
      ctx.body = res;
    } else {
      throw new ApiError(ApiErrorNames.UNEXIST_ID);
    }
  }).catch((err) => {
    throw new ApiError(err.name, err.message);
  });
};

exports.signUp = async (ctx) => {
  const dataObj = ctx.request.body;

  await db.signUp(dataObj).then((res) => {
    const token = tokenHelper.createToken(res);
    const { password, ...restData } = res._doc;
    ctx.res.setHeader('Authorization', token);
    ctx.body = {
      token,
      ...restData,
    };
  }).catch((err) => {
    throw new ApiError(err.name, err.message);
  });
};


/**
 * @desc 登录
 */
 exports.signIn = async (ctx) => {
  const dataObj = ctx.request.body;

  await db.signIn(dataObj).then((res) => {
    const token = tokenHelper.createToken(res);
    const { password, ...restData } = res;
    ctx.res.setHeader('Authorization', token);
    ctx.body = {
      token,
      ...restData,
    };
  }).catch((err) => {
    throw new ApiError(err.name, err.message);
  });
};
