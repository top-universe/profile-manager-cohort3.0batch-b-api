const { ulid } = require("ulid")
const { comparePassword } = require('../../utils/hash')

exports.userExists = async (email) => {
  return await db('users')
    .select()
    .where('email', email)
    .first()
    .then((data) => {
      return data
    }).catch(err => {
      throw err.message
    })
}

exports.create = async (email, password) => {
  const newUser = {
    id: ulid(),
    email,
    password,
  }
  return await db('users')
    .returning("*")
    .insert(newUser)
    .then((data) => {
      return data[0]
    })
    .catch(err => {
      throw err.message
    })
}

exports.updateUserStatus = async (id) => {
  return await db('users')
    .where({ id }) // Find the user by ID
    .update({ status: true }) // Update the 'status' field to true
    .returning('*') // Return the updated record
    .then((data) => {
      if (data.length > 0) {
        return data[0];
      } else {
        throw "User not found with the given ID.";
      }
    })
    .catch((err) => {
      throw err.message;
    });
};


exports.authenticate = async (email, password) => {
  return await db('users')
    .select()
    .where('email', email)
    .first()
    .then(async (user) => {
      if (user) {
        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await comparePassword(password, user.password);
        if (passwordMatch) {
          return user;
        } else {
          throw "Incorrect password";
        }
      } else {
        throw "User not found";
      }
    })
    .catch((err) => {
      throw err.message;
    });
};
