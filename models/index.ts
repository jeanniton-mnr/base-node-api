'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const associations = require('./associations.ts');
const customMethods = require('./custom-methods.ts');
const Op = Sequelize.Op;

const __env	= process.env.NODE_ENV || 'development';
const __dbConfig	= require(`../config/database.ts`)[__env];

const db = {};


const sequelize = new Sequelize(
	__dbConfig.database,
	__dbConfig.username,
	__dbConfig.password,
	{
		host: __dbConfig.host,
		dialect: __dbConfig.dialect,
		logging: true, // No need to see all those boring SQL queries
		operatorsAliases: Op // turn off string deprecation error
	}
);

fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			!['associations.ts', 'custom-methods.ts'].includes(file) &&
			file.slice(-3) === '.ts'
		);
	})
	.forEach(file => {
		//const model = sequelize['import'](path.join(__dirname, file));
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
		db[model.name] = model;
	});

customMethods(db);
associations(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
