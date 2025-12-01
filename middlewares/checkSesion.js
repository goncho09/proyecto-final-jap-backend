const jwt = require('jsonwebtoken');
const SECRET_KEY = 'CLAVE_SUPER_SECRETA_JAP';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['access-token'];

    jwt.verify(authHeader, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Token inválido o expirado"
            });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken }