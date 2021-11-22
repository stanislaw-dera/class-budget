import mysql from "mysql"
import config from "../config.js";

const createColletion = (data) => {

    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);

        const values = [
            data.classId,
            data.name,
            data.description,
            data.amount,
            0
        ];
    
        connection.query("INSERT INTO collections (class_id, name, description, amount, collected) VALUES ?", [[values]], (error) => {
            if(error) reject(error);
            resolve()
        })

    })
}

export default createColletion