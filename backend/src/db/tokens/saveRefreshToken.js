import mysql from "mysql"
import config from "../config.js";

const saveRefreshToken = (data) => {

    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);

        const values = [
            data.userId,
            data.token
        ];
    
        connection.query("INSERT INTO tokens (user_id, token) VALUES ?", [[values]], (error) => {
            if(error) reject(error);
            resolve()
        })

    })
}

export default saveRefreshToken