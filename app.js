const express = require('express')
const app = express()
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
dotenv.config({ path: './config/.env'})

connectDB()

const PORT = process.env.NODE_ENV || 2022

app.listen(
    PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    }
)
