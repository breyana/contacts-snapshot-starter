const router = require('express').Router();
const contactsRoutes = require('./contacts')
const signupRoutes = require('./signup')
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');

router.get('/', (request, response, next) => {
  if (!request.session.username) {
    response.redirect('/signup')
  } else {
    contacts.findAll()
    .then((contacts) => {response.render('contacts/index', { contacts })})
    .catch( error => next(error) )
  }
})

router.use('/contacts', contactsRoutes);
router.use('/signup', signupRoutes);

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

module.exports = router;
