const fs = require("fs");
const path = require("path")

const dirs = fs.readdirSync(__dirname, { withFileTypes: true });

function createRoute() {
    dirs.forEach(item => {
        if (!item.isDirectory() && item.name !== "index.js") {
            const route = require(path.resolve(__dirname, item.name));
            this.use(route.routes());
            this.use(route.allowedMethods());
        }
    })
}

module.exports = createRoute