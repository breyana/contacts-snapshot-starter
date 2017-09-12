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

const findByUsername = function(username) {
  return db.query(`
    SELECT * FROM users
    WHERE username = $1
  `, [username])
  .catch(error => {
    console.error({message: 'Error occurred while executing users.findUser',
                   arguments: arguments});
    throw error
  });
}

module.exports = {
  create,
  findByUsername
}
