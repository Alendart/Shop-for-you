const {hash,compare,genSalt} = require('bcrypt');
const {promisify} = require('util')
const {SALT, SALT_ROUNDS} = require("./hash_parameters");
const promiseHash = promisify(hash);
const promiseCompare = promisify(compare)

async function createHash(data){

    const hashedData = await promiseHash(data, SALT_ROUNDS)

    return hashedData
}

async function compareHash(data,hash){

    const comparedData = await promiseCompare(data,hash)

    return comparedData
}


module.exports = {
    compareHash,
    createHash
}