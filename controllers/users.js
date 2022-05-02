const USERS = require('../models/users')

module.exports = app => {

    app.get('/api/v1/user', (req, res) => {
            USERS.lista(res)
    })

    app.get('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id);

        USERS.buscarPorId(id, res);
    }) 

    app.post('/api/v1/user', (req, res) => {
        const users = req.body

        USERS.adiciona(users, res)
    })

    app.put('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        USERS.altera(id, valores, res);
    }) 

    app.delete('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)

        USERS.deleta(id, res)
    }) 

}