const express = require('express')
const app = express()


app.listen(3000, () => console.log('api em execusção!'))

app.get('/', (req, res) => res.send('Teste de server, ok'))