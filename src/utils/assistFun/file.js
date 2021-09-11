const fs = require("fs");

const addSuffix = (name, mimetype, address) => {
    fs.rename(
        "./" + address + "/" + name,
        "./" + address + "/" + name + "." + mimetype.slice(6),
        (err) => {
            console.log(err);
        }
    );
};

const getImage = (filename, address) => {
    return fs.createReadStream("./" + address + filename);
};

module.exports = {
    addSuffix,
    getImage,
};
