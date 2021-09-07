const { boolean } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const mode1Schema = mongoose.Schema({
  day: {
    type: Number,
    default: 1,
  },
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      hadAccepted: {
        type: boolean,
        default: false,
      },
      messages: [
        {
          type: mongoose.SchemaType.Types.ObjectId,
          ref: 'Message',
        },
      ],
      stagedMessages: [
        {
          type: mongoose.SchemaType.Types.ObjectId,
          ref: 'Message',
        },
      ],
    },
  ],
});

// add plugin that converts mongoose to json
mode1Schema.plugin(toJSON);
mode1Schema.plugin(paginate);

/**
 * @typedef Message
 */
const Mode1 = mongoose.model('Mode1', mode1Schema);

module.exports = Mode1;
