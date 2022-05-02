const moment = require('moment')

const conexao = require('../data/conexao')

class USERS {
    adiciona(users, res) {
        const  birthDate = moment(users.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')

        const NameEhValido = users.name.length >= 3
        const CPFEhValido = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(users.cpf)
        const birthDateEhValida = moment().diff(birthDate, 'years', true) >= 18
        const EmailEhValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(users.email)
        const PasswordEhValido = users.password.length >= 6 
        const AddressEhValido = users.address.length > 6
        const NumberEhValido = users.number.length >= 1
        const ComplementEhValido = users.complement.length > 0
        const CityEhValida = users.city.length > 3
        const StateEhValido = users.state.length >= 2
        const CountryEhValido = users.country.length > 2
        const ZipCodeEhValido = /^[0-9]{5}-[0-9]{3}$/.test(users.zipCode)

        const validacoes = [
            {
                nome: 'name',
                valido: NameEhValido,
                mensagem: 'Nome tem que pelo menos 3 caracters'
            },
            {
                nome: 'cpf',
                valido: CPFEhValido,
                mensagem: 'cpf inválido'
            },
            {
                nome: 'birthDate',
                valido: birthDateEhValida,
                mensagem: 'Usuário tem que ter pelo menos 18 anos'
            },
            {
                nome: 'email',
                valido:  EmailEhValido,
                mensagem: 'email inválido'
            },
            { 
                nome: 'password',
                valido: PasswordEhValido,
                mensagem: 'A senha deve conter pelo menos 6 caracters'   
            },       
            {
                nome: 'local',
                valido: AddressEhValido && NumberEhValido && ComplementEhValido && CityEhValida
                 && StateEhValido && CountryEhValido && ZipCodeEhValido,
                mensagem: 'Localização Obrigatória'
            }
        ]
        
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {        

        const btDate = {...users, birthDate}

        const sql = 'INSERT INTO USERS SET ?'

        conexao.query(sql, users, (erro, resultados) => {
            if(erro) {
                 res.status(400).json(erro)
            } else {
                 res.status(201).json(users)
            }
        })
    }
}
    //Método GET listar todos
    lista(res) {
    const sql = 'SELECT * FROM USERS'

    conexao.query(sql, (erro, resultados) => { 
         if(erro) {
             res.status(404).json(erro)
         } else { 
             res.status(200).json(resultados)
         }
    })
}
    //Método GET buscar por Id
    buscaPorId(id, res) {
    const sql = `SELECT * FROM USERS WHERE id=${id}`;

    conexao.query(sql, (erro, resultados) => { 
        const user = resultados[0]
         if(erro) { 
             res.status(404).json(erro);
         } else {
             res.status(200).json(user);
         }
    })
}
    //Método PUT
    altera(id, valores, res) {
        if(valores.birthDate) {
             valores.birthDate = moment(valores.birthDate, 'DDD/MM/YYYY').format('YYYY-MM-DD')
        }   

    const sql = 'UPDATE USERS SET ? WHERE id=?'
 
 
    conexao.query(sql, [valores, id], (erro, resultados) => { 
        if(erro) {
             res.status(404).json(erro)
         } else {
             res.status(200).json({...valores, id})
         }
    })
}
    //Método DELETE
    deleta(id, res) {     
    const sql = 'DELETE FROM USERS WHERE id=?'

    conexao.query(sql, id, (erro, resultados) => {
        if(erro) {
             res.status(404).json(erro)
         } else {
             res.status(200).json( `usuário com id: ${id} excluído com sucesso!`)
         }
     })
   }
}

module.exports = new USERS