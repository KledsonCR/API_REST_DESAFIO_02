class Tabelas {
    init(conexao) {
         this.conexao = conexao

         this.criarUSERS()
         this.criarTask()
    }

    criarUSERS() {
         const sql = `
                        CREATE TABLE IF NOT EXISTS Users (
                        id int NOT NULL AUTO_INCREMENT,
                        name varchar(50) NOT NULL,
                        cpf varchar(14) NOT NULL,
                        birthDate DATE NOT NULL,
                        email varchar(40) NOT NULL,
                        password varchar(30) NOT NULL,
                        address varchar(200) NOT NULL,
                        number varchar(15) NOT NULL,
                        complement varchar(60) NOT NULL,
                        city varchar(50) NOT NULL,
                        state varchar(20) NOT NULL,
                        country varchar(40) NOT NULL,
                        zipCode varchar(11) NOT NULL,
                        PRIMARY KEY (id))
                      `
         this.conexao.query(sql, (erro) => {
             if(erro) {
                 console.log(erro)
             } else {
                 console.log('Tabela users criada com sucesso!') 
             }
         })
    }

    criarTask() {
         const sql = `
                       CREATE TABLE IF NOT EXISTS Tasks (
                       description varchar(150) NOT NULL,
                       date DATETIME NOT NULL, 
                       user int,
                       CONSTRAINT fk_userTask FOREIGN KEY (user) REFERENCES USERS (id))
                     `

         this.conexao.query(sql, (erro) => {
             if(erro) {
                 console.log(erro)
               } else {
                 console.log('Tabela Task criada com sucesso!') 
               }
         })
    }
}
module.exports = new Tabelas