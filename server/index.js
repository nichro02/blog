//configure server
import express from 'express'
import bodyPaser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

//instantiate app and general setup
const app = express()
//handle different sized images
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

//set up Mongoose
const DB_CONNECTION = process.env.DATABASE_URL
const PORT = process.env.PORT || 6000

mongoose
  .connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running @ : http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.error(error))

app.use(cors())