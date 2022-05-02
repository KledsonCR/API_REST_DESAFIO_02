const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    porta: 3306,
    user: 'root',
    password: 'kledson3d90',
    database: 'spectrum'
})

module.exports = conexao