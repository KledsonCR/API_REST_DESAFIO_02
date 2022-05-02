const conexao = require('../data/conexao')

class USERS {
    adiciona(users) {
        const sql = 'INSERT INTO USERS SET ?'

        conexao.query(sql, users, (erro, resultados) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultados)
            }
        })
    }
}

module.exports = new USERS