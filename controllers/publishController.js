const data = require('../models/readDataJson');

function publish (_, res) {
    try {
        res.status(200).send(data.readDataFromJson('sell', 'publish'));
    }catch {
        res.status(400).send({msg: "Ocurrio un error inesperado."});
    }
}

module.exports = {
    publish,
}