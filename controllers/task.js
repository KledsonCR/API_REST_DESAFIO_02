const Task = require('../models/task')

module.exports = app => {
    //Método GET
    app.get('/api/v1/user', (req, res) => {
        Task.lista(res)
    })
    //Método GET pegando por Id
    app.get('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Task.buscarPorId(id, res);
    }) 
    //Método POST
    app.post('/api/v1/user', (req, res) => {
        const users = req.body

        Task.adiciona(users, res)
    })
    //Método PUT
    app.put('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Task.altera(id, valores, res);
    }) 
    //Método DELETE
    app.delete('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Task.deleta(id, res)
    }) 

}