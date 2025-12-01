const loginModel = require('../models/loginModel');

async function loginAuth(req, res) {
    const { user, password } = req.body;

    if (!user.trim() || !password.trim()) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrecta!' });
    }

    try {
        const token = await loginModel.signToken(user);
        if (token) {
            res.status(200).json({
                success: true,
                message: "Login exitoso",
                token,
            });
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Ocurrio un error inesperado!"
        });
    }
}

module.exports = {
    loginAuth
}