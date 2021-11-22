import mysql from "mysql"
import config from "../config.js";

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);
    
        connection.query("SELECT * FROM users WHERE email = ?", [email], (error, results, fields) => {
            if(error) reject(error);
            resolve(results[0])
            connection.end()
        })

    })
}

export default getUserByEmail;