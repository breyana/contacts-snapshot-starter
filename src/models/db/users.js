const db = require('./db')

const create = function(user) {
  return db.query(`
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    RETURNING username
    `, [user.username, user.hash])
    .catch(error => {
      console.error({message: 'Error occurred while executing users.create',
                     arguments: arguments});
      throw error
    });
}

module.exports = {
  create
}
