const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const poolValidation = require('../../validations/pool.validation');
const poolController = require('../../controllers/pool.controller');

const router = express.Router();

router.route('/pair').post(auth('joinPool'), validate(poolValidation.joinPool), poolController.joinPool);

module.exports = router;

// TODO: docs
