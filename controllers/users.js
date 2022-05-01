module.exports = app => {
    app.get('/api/v1/user', (req, res) => res.send('Realizando GET na rota usuários!'))

    app.post('/api/v1/user', (req, res) => {
        console.log(req.body)
        res.send('Realizando POST na rota usuários!')
    })

}