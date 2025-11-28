const path = require('path');

function readDataFromJson(nameFolder, fileName) {
    return require(path.join(__dirname, `../json/${nameFolder}/${fileName}`));
}

module.exports = {
    readDataFromJson,
};