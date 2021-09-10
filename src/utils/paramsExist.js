function paramsExist(...args) {
    return args.every(item => item ? true : false);
}

module.exports = {
    paramsExist
}