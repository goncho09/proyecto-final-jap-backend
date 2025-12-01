const jwt = require('jsonwebtoken');
const SECRET_KEY = 'CLAVE_SUPER_SECRETA_JAP';

async function signToken(user) {
    const token = jwt.sign({
        email: user
    }, SECRET_KEY, { expiresIn: '24h' });

    return token;
}

module.exports = { signToken };