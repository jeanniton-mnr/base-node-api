#!/usr/bin/env node

const path = require('path');
const dotenvPath = path.resolve('..', '.env');
const dotenv = require('dotenv').config({ path: dotenvPath});
const env	= process.env.NODE_ENV || 'development';
const dbConfig	= require(`../config/database`)[env];

if (dotenv.error) {
	return console.log(`.env file not found at '${dotenvPath}')}`);
}

const SequelizeAuto = require('sequelize-auto');

// We don't want to populate every table from the database, just the ones we
// definitely need...
let tablesToPopulate = process.env.DEFAULT_TABLES.split(',');

// ... and additional ones later on
if (process.argv.length > 2) {
	tablesToPopulate.push(...process.argv.slice(2))
}

const auto = new SequelizeAuto(dbConfig.database, dbConfig.user, dbConfig.password, {
	host: dbConfig.host,
	dialect: dbConfig.dialect,
	directory: './models',
	tables: tablesToPopulate,
	additional: {
		timestamps: false,
		underscored: true
	},
	logging: false
});

auto.run(function (err) {
	if (err) throw err;
});
