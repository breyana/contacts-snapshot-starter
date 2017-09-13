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

router.post('/', (request, response) => {
  const username = request.body.username
  const password = request.body.password
  let errorMessage
  users.findByUsername(username)
    .then(user => {
      bcrypt.compare(password, user[0].password)
      .then(result => {
        if (result) {
          if (user[0].role === 'admin') {
            request.session.admin = true
          }
          request.session.username = username
          response.redirect('/')
        } else {
          throw new Error()
        }
      })
    })
    .catch(error => {
      errorMessage = 'Incorrect email or password'
      response.render('auth/login', {errorMessage})
    })
})

module.exports = router
