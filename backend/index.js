const connectToMongo = require('./db');
const express = require('express');
const router = require('./routes/auth')

connectToMongo()
const app = express()
const port = 3000

app.use(express.json());

app.use('/api/auth', router)


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})