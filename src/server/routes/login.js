const users = require('../../models/users')
const router = require('express').Router()
const bcrypt = require('bcrypt')

router.get('/', (request, response) => {
  if (request.session.username) {
    response.redirect('/')
  } else {
    response.render('auth/login')
  }
})

module.exports = router
