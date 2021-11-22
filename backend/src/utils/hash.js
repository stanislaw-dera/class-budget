import bcrypt from "bcrypt"

const SALT_ROUNDS = 10;

const getHash = password => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
            if(err) reject(err)
            resolve(hash)
        });
    })
}

const compareWithHash = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function(err, result) {
            if(err) reject(err)
            resolve(result)
        });
    })
}

export {getHash, compareWithHash}