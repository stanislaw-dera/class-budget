import mysql from "mysql"
import config from "../config.js";

const createUsers = (classId, users) => {

    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);

        const values = [];
        users.map(user => {
            values.push([
                user.name,
                user.surname,
                classId,
                0
            ])
        })
        console.log(values)
    
        const sql = "INSERT INTO users (name, surname, class_id, role) VALUES ?"
        connection.query(sql, [values], (error) => {
            if(error) reject(error);
            resolve()
        })

    })
}

export default createUsers;