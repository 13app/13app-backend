const httpStatus = require('http-status');
const { Pool } = require('../models');
const ApiError = require('../utils/ApiError');

// TODO: comment
const isInPool = async (userId, mode) => {
  const filter = { userId, mode };
  const join = await Pool.findOne(filter).exec();
  return join != null;
};

// TODO: comment
const joinPool = async (userId, mode) => {
  if (isInPool(userId, mode)) throw new ApiError(httpStatus.BAD_REQUEST, `Already join pool of ${mode}`);

  return Pool.create({ userId, mode });
};

module.exports = {
  isInPool,
  joinPool,
};
