const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { poolService } = require('../services');

const joinPool = catchAsync(async (req, res) => {
  const join = await poolService.joinPoll(req.user._id, req.body.mode);
  res.status(httpStatus.CREATED).send(join);
});

module.exports = {
  joinPool,
};
