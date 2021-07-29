const express = require('express');
const router = express.Router();

const Log = require('../services/logger.ts');

router.get('/', (req, res) => {
	Log.log('info', 'health-check - Enter');

	__pool.getConnection((err, connection) => {
		connection.release();
		let healthCheck = new HealthCheck( req, connection.config.database);
		if (err) {
			Log.log('error', 'health-check - Failed; database failure');
			Log.log('error', err.toString());
			healthCheck.database = "Failed";
		}else{
			Log.log('info', 'health-check - succeeded');
		}
		res.json(healthCheck.classToPlain());
	});
});

module.exports = router;
