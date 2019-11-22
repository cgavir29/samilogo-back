const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const signin = require('./routes/signin')
const products = require('./routes/api/products')
const users = require('./routes/api/users')

const port = process.env.PORT || 5000

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

// DB Config
const db = "mongodb+srv://samilogo:samilogo@telematica-aas7y.mongodb.net/samilogo?retryWrites=true&w=majority"
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

// Routes
app.use('/api/products', products)
app.use('/api/users', users)
app.use('/signin', signin)

app.listen(port, '172.31.34.245')
//app.listen(port, () => {
//    console.log(`Server is running on port ${port}`)
//})
