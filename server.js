const express = require('express')
const apiRoutes = require('./routes')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect("mongodb://localhost/socialMedia")

app.use(apiRoutes)

app.listen(3000, () => {
    console.log('listening on 3000')
})