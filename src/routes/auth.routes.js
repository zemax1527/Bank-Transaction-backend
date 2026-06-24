const express = require('express')
const authController = require('../controller/auth.controller')
const router  = express()

router.post('/register', authController.userRegisterController)
router.post('/login', authController.userLoginController)

module.exports = router 