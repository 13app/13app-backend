const Joi = require('joi');
const { modes } = require('../config/modes');

const joinPool = {
  body: Joi.object().keys({
    mode: Joi.string()
      .required()
      .valid(...modes),
  }),
};

module.exports = {
  joinPool,
};
