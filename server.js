const express = require('express')
const app = express()

app.listen(3000, () => console.log('api em execução!'))

app.get('/api/v1/user', (req, res) => res.send('Realizando GET na rota usuários!'))