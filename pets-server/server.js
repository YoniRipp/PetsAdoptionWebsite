const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const petsRoute = require('./routes/petRoutes')
const usersRoute = require('./routes/userRoutes')

const { PORT, MONGO_URI } = process.env

const app = express()

app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use(express.json())
app.use(cookieParser())


app.use('/images', express.static('images'))

app.use('/pets', petsRoute)
app.use('/users', usersRoute)


async function init() {
  const connection = await mongoose.connect(MONGO_URI, { dbName: 'petsDB' })
  if (connection) {
    console.log('Connected to DB')
    app.listen(PORT || 8080, () => {
      console.log('App is listening on port ' + PORT)
    })
  }
}


init()


