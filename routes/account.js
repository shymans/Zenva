const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	
	res.json({
		user: req.user || 'not logged in'
	})
})

module.exports = router

router.get('/logout', (req, res, next) => {
	req.logout()
	res.json({
		confirmaton: 'user logged out'
	})
})