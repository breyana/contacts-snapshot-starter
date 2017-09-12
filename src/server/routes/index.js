const router = require('express').Router();
const contactsRoutes = require('./contacts')
const signupRoutes = require('./signup')
const loginRoutes = require('./login')
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');

router.get('/', (request, response, next) => {
  if (!request.session.username) {
    response.redirect('/login')
  } else {
    contacts.findAll()
    .then((contacts) => {response.render('contacts/index', { contacts })})
    .catch( error => next(error) )
  }
})

router.get('/logout', (request, response) => {
  request.session.destroy(err => console.log)
  response.redirect('/')
})

router.use('/contacts', contactsRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes)

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

module.exports = router;
