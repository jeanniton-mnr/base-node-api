/* heroku ps:forward 9229 */


// Instanciate all global variables
const path = require('path');
const dotenvPath = path.resolve('./', '.env');
const dotenv = require('dotenv').config({ path: dotenvPath});
if (dotenv.error) {
	return console.log(`.env file not found at '${dotenvPath}')}`);
}
require('./global_vars.ts');

const http = require('http');
const debug = require('debug')('report-server:server');
const { normalizePort, onError, onListening } = require('./utils.ts');
const models = require('../models/index.ts');
const app = require('../app.ts');


/* Get port from environment and store in Express. */
const port = normalizePort(process.env.PORT || `8080`);
/*  Create HTTP server. */
const server = http.createServer(app);
app.set('port', port);


models.sequelize.sync()
	.then(() => {

	/* Listen on provided port, on all network interfaces. */
	if (process.env.NODE_ENV !== 'test') {
		server.listen(port);
	}
	server.on('error', onError(port));
	server.on('listening', onListening(server, debug));

	}).
	catch(e => {
		console.log(e);
	});




module.exports = server;
