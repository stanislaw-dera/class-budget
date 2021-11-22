import mysql from "mysql"
import config from "../config.js";

const getAllCollectionsByClass = (classId) => {

    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);
    
        connection.query("SELECT * FROM collections WHERE class_id = ?", [classId], (error, results, fields) => {
            if(error) reject(error);
            resolve(results)
            connection.end()
        })

    })
}

export default getAllCollectionsByClass;