/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userRole', {
		roleId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'role',
				key: 'id'
			}
		},
		userId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		}
	}, {
		tableName: 'userRole',
		timestamps: false,
	});
};
