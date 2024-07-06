const express = require('express')
const cors = require('cors')
const connectDB = require('./configs/db')

const membersController = require('./controllers/membersController')
const usersController = require('./controllers/usersController')
const moviesController = require('./controllers/moviesController')
const subsController = require('./controllers/subsController')

const app = express()
const PORT = 3000

connectDB()

app.use(cors())
app.use(express.json())
app.use('/members', membersController)
app.use('/users', usersController)
app.use('/movies', moviesController)
app.use('/subs', subsController)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
