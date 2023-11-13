const express = require('express')
const apiRoutes = require('./routes/mainRoutes')
const server = express()

server.use(express.json())
server.use('/api', apiRoutes)

module.exports = server