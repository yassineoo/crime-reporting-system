const jwt = require('jsonwebtoken');

const Authorization = async (req, res, next) => {
	try {
		const token = req.header('Authorization')?.replace('Bearer ', '');

		if (!token) {
			res.status(401);
			return res.json({
				error: 'Access denied. No token provided.',
			});
		}

		const decoded = await jwt.verify(token, 'server-secret');
		console.log(decoded);
		req.user = {
			id: decoded?.id,
			idRole: decoded.idRole,
		};

		next();
	} catch (error) {
		if (error.message === 'Token expired') {
			res.status(401).json({ error: 'Token expired' });
		} else if (error.name === 'JsonWebTokenError') {
			res.status(401).json({ error: 'Invalid token' });
		} else {
			next(error);
		}
	}
};
module.exports = Authorization;
