const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cult_prod_db'
})

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("success db connection")
    } else {
        console.log("err db connection : " + JSON.stringify(err))
    }
})

module.exports = mysqlConnection