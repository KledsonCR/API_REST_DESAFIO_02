const USERS = require('../models/users')

module.exports = app => {
    app.get('/api/v1/user', (req, res) => res.send('Realizando GET na rota usuários!'))

    app.post('/api/v1/user', (req, res) => {
        const users = req.body

        USERS.adiciona(users)
        res.send('Realizando POST na rota usuários!')
    })

}