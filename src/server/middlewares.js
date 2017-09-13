const errorHandler = (error, request, response, next) => {
  response.status(500).send('Something bad happened. This page should be nicer looking');
};

const logErrors = (error, request, response, next) => {
  console.error(error.stack)
  next(error);
};

const notFoundHandler = (request, response) => {
  response.status(404).render('common/not_found', {name: 'Foobar'})
}

const setDefaultResponseLocals = (request, response, next) => {
  response.locals.query = ''
  response.locals.errorMessage = undefined

  if (request.session.username) {
    response.locals.session = true
  } else {
    response.locals.session = false
  }

  if (request.session.admin) {
    response.locals.admin = true
  } else {
    response.locals.admin = false
  }
  
  next()
}

module.exports = { errorHandler, logErrors, notFoundHandler, setDefaultResponseLocals };
