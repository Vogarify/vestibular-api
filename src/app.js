const express = require('express')
const { errors } = require('celebrate')
const { NotFoundError } = require('./shared/errors.http')

const dotenv = require('dotenv')

dotenv.config()

const auth = require('./routes/auth/api')
const question = require('./routes/question/api')
const activity = require('./routes/activity/api')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/** Routes */
app.use('/v1/auth', auth)
app.use('/v1/question', question)
app.use('/v1/activity', activity)

/** Not found Handler */
app.use((_req, _res, next) => {
    next(new NotFoundError())
})

app.use(errors())

app.use(
    ({ message, systemCode, systemCodeContext, status }, _req, res, _next) => {
        const errorDto = { message, systemCode, systemCodeContext }
        return res.status(status || 500).json(errorDto)
    }
)

module.exports = app
