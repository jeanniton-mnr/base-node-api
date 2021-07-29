module.exports = {
	development: {
		username: 'root', // for sequelize
		user: 'root', // for mysql
		password: 'Applesuzuki04',
		database: 'test',
		host: '162.243.83.79',
		dialect: `mysql`
	},
	test: {
		username: 'root', // for sequelize
		user: 'root', // for mysql
		password: 'Applesuzuki04',
		database: 'test',
		host: '162.243.83.79',
		dialect: `mysql`
	},
	production: {
		username: process.env.DB_USER || 'root', // for sequelize
		user: process.env.DB_USER || 'root', // for mysql
		password: process.env.DB_PASSWORD || 'Applesuzuki04',
		database: process.env.DB_SCHEMA || 'test',
		host: process.env.DB_HOST || `162.243.83.79`,
		dialect: process.env.DB_DIALECT || `mysql`
	}
}
