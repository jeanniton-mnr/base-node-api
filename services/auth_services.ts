const passport = require('passport');

// Simple function to take care of authentication
const isAuthenticated = (req, res, next) => {
	passport.authenticate('jwt', function(err, user, info) {
	  if (err) return next(err);
	  if (!user){
		const msg = "Your token or permission is invalid, and, you cannot access this resource.\n"+
					"Do you want to re-login and refresh your token?";
		return res.status(401).json({ err: msg });
	  }
	  req.user = user;
	  next();
	})(req, res, next);
  }


// Higher order function to take care of authorizations
// It uses the 'code' column of the role table of the logged in user
const isAuthorized = authorizedRoles =>
	(req, res, next) => {
		const currentUserRoles = req.user.roles.map(role => role.code);

		// Power to the admins
		if (currentUserRoles.includes('admin')) return next();

		const found = currentUserRoles.some(role =>
			authorizedRoles.includes(role)
		);

		if (!found) {
			// TODO: Improve this error message
			return res.status(403).json({ err: 'Forbidden' });
		}

		next();
	};

module.exports = {
	isAuthenticated,
	isAuthorized
};
