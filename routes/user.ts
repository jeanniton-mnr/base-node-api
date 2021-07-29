const express = require('express');
const Sequelize = require('sequelize');
const Log = require(`../services/logger.ts`);

const router = express.Router();
const _ = require('lodash');
const Op = Sequelize.Op;
const db = require('../models/index.ts');
const jwt = require('jsonwebtoken');
const { UUID } = require('sequelize');

const normalizeUser = async (user) => {

    return {
		user: await user.toJSON(),
		token: jwt.sign(
			await user.toJSON(), 
			process.env.JWT_SECRET, 
			{expiresIn: process.env.JWT_EXPIRATION_LENGTH}
		)
	};

};

// Create a new user
router.post('/create', async (req, res) => {
	Log.info('create user - enter');

	const userData = {
		userName: req.body.userName,
		fullName: req.body.fullName,
		email: req.body.email,
		password: req.body.password || UUID(),
		facebookId: req.body.facebookId || null,
		googleId: req.body.googleId || null,
		role: req.body.role || {}
	};
	let createdUser = null;

	try {
		const user = await db.user.findOne({
			where: { [Op.or]: [{ userName: userData.userName }, { email: userData.email }] }
		});
		if (user) {
			throw new Error('Email/username already exists');
		}else{
			createdUser = await db.user.create(userData);
			res.json(normalizeUser(createdUser));
			Log.info('User created success');
		}
	} catch (err) {
		// Destroy created user first
		if(createdUser){
			createdUser.destroy();
		}
		// return failed request
		Log.error(`Create user failed - ${err}`);
		res.status(400).json({
			message: `Failed to create user ${err}`,
			err: `${err}`
		});
	}
});


/* Login user email */
router.post('/login/email', async (req, res) => {
	niouzLog.info('niouz_login - Enter');

	const loginData  = {
		userNameOrEmail: req.body.userNameOrEmail.toLowerCase(),
		password: req.body.password
	};
	if( ! loginData.userNameOrEmail || ! loginData.password){
		return res.status(400).send({ msg: "Bad request, missing username or password" });
	}

	try {
		// Get the user with the assigned role code
		const user = await db.user.findOne({
			where: { [Op.or]: [{ userName: loginData.userNameOrEmail }, { email: loginData.userNameOrEmail }] }
		});
		// Verify if user is found and password is valid
		const isValid = user && await user.comparePassword(password);
		if (!isValid) {
			niouzLog.warn('niouz_login - Invalid Credentials');
			return res.status(401).send({ msg: "Invalid Credentials" });
		}else{
			// Everything went well
			niouzLog.info('niouz_login - succeeded');
			res.json(normalizeUser(createdUser));
		}
	} catch(err) {
		niouzLog.warn(`niouz_login - Error: ${err}`);
		return res.status(500).send({ msg: "Internal Server Error" });
	}
});

module.exports = router;