const moment = require('moment')

const conexao = require('../data/conexao')

class USERS {
    adiciona(users) {
        const  birthDate = moment(users.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')

        const sql = 'INSERT INTO USERS SET ?'

        conexao.query(sql, users, (erro, resultados) => {
            if(erro) {
                 res.status(400).json(erro)
            } else {
                 res.status(201).json(resultados)
            }
        })
    }
}

module.exports = new USERS