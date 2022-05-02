const USERS = require('../models/users')

module.exports = app => {
    //Método GET
    app.get('/api/v1/user', (req, res) => {
            USERS.lista(res)
    })
    //Método GET pegando por Id
    app.get('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id);

        USERS.buscarPorId(id, res);
    }) 
    //Método POST
    app.post('/api/v1/user', (req, res) => {
        const users = req.body

        USERS.adiciona(users, res)
    })
    //Método PUT
    app.put('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        USERS.altera(id, valores, res);
    }) 
    //Método DELETE
    app.delete('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)

        USERS.deleta(id, res)
    }) 

}