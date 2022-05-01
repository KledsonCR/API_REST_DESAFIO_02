module.exports = app => {
    app.get('/api/v1/user', (req, res) => res.send('Realizando GET na rota usuários!'))
}