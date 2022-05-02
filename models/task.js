const moment = require('moment')
const task = require('../controllers/task')

const conexao = require('../data/conexao')

class Task {
    adiciona(task, res) {
           
        const date = moment(task.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dateEhValida = moment(date).isAfter(moment())
        const descriptionEhValida = task.description.length > 8

        const validacoes = [
            {
                nome: 'date',
                valido: dateEhValida,
                mensagem: 'inserir uma data atualizada'
            },
            {
                nome: 'description',
                valido: descriptionEhValida,
                mensagem: 'descreva pelo menos 8 caracters'
            },
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {        

        const taskDate = {...task, date}

        const sql = 'INSERT INTO Task SET ?'

        conexao.query(sql, taskDate, (erro, resultados) => {
            if(erro) {
                 res.status(400).json(erro)
            } else {
                 res.status(201).json(task)
            }
        })
    }
}
    //Método GET listar todos
    lista(res) {
    const sql = 'SELECT task.*, users.id FROM task JOIN users on task.user = users.id'

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
    const sql = `SELECT task.*, users.id FROM task JOIN users on task.user = users.id WHERE user=${id}`

    conexao.query(sql, (erro, resultados) => { 
        const task = resultados[0]
         if(erro) { 
             res.status(404).json(erro);
         } else {
             res.status(200).json(task);
         }
    })
}
    //Método PUT
    altera(id, valores, res) {
        if(valores.date) {
             valores.date = moment(valores.date, 'DDD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }   

    const sql = 'UPDATE Task SET ? WHERE user=?'
 
 
    conexao.query(sql, [valores, id], (erro, resultados) => { 
        if(erro) {
             res.status(404).json(erro)
         } else {
             res.status(201).json({...valores, id})
         }
    })
}
    //Método DELETE
    deleta(id, res) {     
    const sql = 'DELETE FROM Task WHERE user=?'

    conexao.query(sql, id, (erro, resultados) => {
        if(erro) {
             res.status(404).json(erro)
            } else {
                res
                  .status(200)
                  .json(`task com id: ${id} excluído com sucesso!`);
              }
          });
       }    
    }  
module.exports = new Task