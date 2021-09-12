const mongoose = require('mongoose');
const { modes } = require('../config/modes');
const { toJSON, paginate } = require('./plugins');

const poolSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mode: {
    type: String,
    enum: modes,
    required: true,
  },
});

// add plugin that converts mongoose to json
poolSchema.plugin(toJSON);
poolSchema.plugin(paginate);

/**
 * @typedef Pool
 */
const Pool = mongoose.model('Pool', poolSchema);

module.exports = Pool;
