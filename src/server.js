require('dotenv/config')
const express = require('express')
const router = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/user', router)

const port = 3000

app.listen(process.env.PORT || port, () => {
    console.log(`Server has been iniciated on port ${ port }`)
})