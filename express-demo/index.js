const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const config = require('config');
const express = require('express');
const logger = require('./middleware/logger')
const Joi = require('joi');
const app = express();
const courses = require('./routes/courses')
const home = require('./routes/home')

app.set('view engine', 'pug')
app.set('views', './views') // default template location


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(logger)
app.use('/api/courses', courses) // For any call to this route, use courses
app.use('/', home)

// To turn on debugging set an env variable DEBUG=app:startup, app:db
startupDebugger(`Application name: ${config.get('name')}`)
dbDebugger(`Mail Server: ${config.get('mail.host')}`)
dbDebugger(`Mail Password: ${config.get('mail.password')}`)


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)    
}