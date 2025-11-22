const publishMsg = require('../json/sell/publish.json');

function publish (req, res) {
    try {
        res.status(200).send(publishMsg);
    }catch {
        res.status(400).send({msg: "Ocurrio un error inesperado."});
    }
}

module.exports = {
    publish,
}