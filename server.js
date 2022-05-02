const customExpress = require('./config/customExpress')
const conexao = require('./data/conexao')
const Tabelas = require('./data/Tabelas')

conexao.connect(erro => {
   if(erro) {
       console.log(erro)
   } else {
       console.log('conectado com sucesso!')
    
       Tabelas.init(conexao)
       const app = customExpress()

       app.listen(3000, () => console.log('api em execução!'))
   }
})



