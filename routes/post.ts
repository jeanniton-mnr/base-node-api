const express = require('express');
const Sequelize = require('sequelize');
const Log = require(`../services/logger.ts`);
const router = express.Router();
const _ = require('lodash');
const Op = Sequelize.Op;
const db = require('../models/index.ts');




router.post('/', async (req, res) => {

    Log.info('create post - enter');

	try {
        Log.info('New post created with success');

        res.json({
            message: 'new post created with success',
        });

	} catch (err) {
		// return failed request
		Log.error(`Create post failed - ${err}`);
		res.status(400).json({
			message: `Failed to create post ${err}`,
			err: `${err}`
		});
	}
});

module.exports = router;