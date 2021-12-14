//configure server
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbConfig = require('./config/db.config')
const cors = require('cors')
//instantiate app and general setup
const app= express()

require('dotenv').config()

require('./routes/blogPosts.routes')(app)


//dotenv.config()


//handle different sized images
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(cors())

//app.use("/api/blogs", blogPosts)

//set up Mongoose
const db = require('./models/index')
const dbURL = process.env.MONGODB_URL || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
//const DB_CONNECTION = process.env.DATABASE_URL
const PORT = process.env.PORT || 4000

db.mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running @ : http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.error(error))

//simple route, do I work?
app.get('/', (req, res)=> {
    res.json({message: "Welcome to the home page"})

})

//routes
require('./routes/blogPosts.routes')(app)


//set prot, listen for request
// const PORT = process.env.PORT || 8080
// app.listen(PORT, () => {
//     console.log(`Server running on ${PORT}`)
// })