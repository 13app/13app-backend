const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const poolSchema = mongoose.Schema({
  name: {
    mode1: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
});

// add plugin that converts mongoose to json
poolSchema.plugin(toJSON);
poolSchema.plugin(paginate);

/**
 * @typedef Pool
 */
const Pool = mongoose.model('User', poolSchema);

module.exports = Pool;
