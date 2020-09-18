require('dotenv/config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(process.env.URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

module.exports = mongoose