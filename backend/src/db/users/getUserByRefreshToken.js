import mysql from "mysql"
import config from "../config.js";

const getUserByRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);

        console.log("=== getUserByRefreshToken ===")
        console.log(`token is ${token}`)
    
        connection.query("SELECT users.id, users.class_id, users.name, users.surname FROM users, tokens WHERE users.id = tokens.user_id AND tokens.token = ?", [token], (error, results, fields) => {
            if(error) reject(error);
            console.log("Results:")
            console.log(results)
            console.log("========")
            resolve(results[0])
            connection.end()
        })

    })
}

export default getUserByRefreshToken