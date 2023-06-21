const connectToMongo = require('./db');
const express = require('express');
const router_auth = require('./routes/auth')
const router_notes = require('./routes/notes')

connectToMongo();
const app = express()
const port = 6000

app.use(express.json());

app.use('/api/auth', router_auth)
app.use('/api/notes', router_notes)

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})