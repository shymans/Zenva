const express = require('express')
const path = require('path')
const home = require('./routes/home')
const mongoose = require('mongoose')
const register = require('./routes/register') //Import the register route
const login = require('./routes/login')
const passport = require('passport')
const session = require('express-session')
const auth = require('./config/auth')(passport) //Import auth.js
const account = require('./routes/account') //Import the account route
const admin = require('./routes/admin')


mongoose.connect('mongodb://localhost/sample-store', (err, data) => {
	if (err){
		console.log('DB Connection Failed')
		return
	}

	console.log('DB Connection Success')
})

const app = express() // Where we initialized the application
app.use(session({
	secret: 'oqwdbowdq',
	resave: true,
	saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hjs')

app.use('/account', account)
app.use(express.json()) //Parse the form as JSON
app.use(express.urlencoded({extended: false})) //Let us receive the data and parse it
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', home)
app.use('/register', register) //Connect the path and route
app.use('/login', login)
app.use((err, req, res, next) => {
	console.log('ERROR: ' + err)
	res.render('error', {message: err.message})
})
app.use('/admin', admin)

app.listen(5000)
console.log('App running on http://localhost:5000')

