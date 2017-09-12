const users = require('../../models/users')

const router = require('express').Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/', (request, response) => {
  response.render('auth/signup')
})

router.post('/', (request, response, next) => {
  const { username, password } = request.body
  const passwordConfirm = request.body['password-confirmation']
  let errorMessage

  if (!password || !username) {
    errorMessage = 'Please provide both an email and password to sign up'
  } else if (password !== passwordConfirm) {
    errorMessage = 'The password and password confirmation does not match'
  }

  if (errorMessage) {
    response.render('auth/signup', { errorMessage })
  } else {
    bcrypt.hash(password, saltRounds)
      .then(hash => users.create({ username, hash }))
      .then(username => response.redirect('/'))
      .catch(error => {
        console.warn(error)
        response.render('auth/signup', { errorMessage: error })
        next()
      })
  }
})

module.exports = router
