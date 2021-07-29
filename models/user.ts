/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		fullName: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		userName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		facebookId: {
			type: DataTypes.STRING(255),
			allowNull: true,
			unique: true
		},
		googleId: {
			type: DataTypes.STRING(255),
			allowNull: true,
			unique: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: '1'
		}
	}, {
		tableName: 'user',
		timestamps: false
	});
};
