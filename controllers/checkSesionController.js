function checksesion(req, res) {
    res.json({
        success: true,
        authenticated: true,
        user: req.user
    });
}

module.exports = { checksesion };