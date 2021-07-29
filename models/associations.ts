module.exports = models => {
	models.user.belongsToMany(models.role, { through: 'userRole' });
	models.role.belongsToMany(models.user, { through: 'userRole' });
};
