const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use('/assets', express.static('assets'))

app.listen(3333)