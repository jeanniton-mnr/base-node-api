

const {version} = require('./package.json');

const cors = require('cors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const passport = require('passport');
const configurePassport = require('./config/passport.ts');
// eslint-disable-next-line no-unused-vars
const { isAuthenticated, isAuthorized } = require('./services/auth_services.ts');


const app = express();

// Configuring express app
app.use(cors());
app.use(passport.initialize());
configurePassport();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(validator());
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Home screen
app.get('/', function (req, res) {
	res.sendFile(`${__basedir}/public/index.html`);
});


/* ======================  API ROUTE DEFINITIONS START ======================  */
const route_health_check = require('./routes/health_check.ts');
const route_user = require('./routes/user.ts');
const route_post= require('./routes/post.ts');
/* ====================== API ROUTE DEFINITIONS ENDS =======================  */

// Checker to test live state of API
app.use('/health-check', route_health_check);
// User route
app.use('/user', route_user);
// Post/Feed route
app.use('/post', isAuthenticated, route_post);

// Version
app.set('node_api', version);

module.exports = app;
