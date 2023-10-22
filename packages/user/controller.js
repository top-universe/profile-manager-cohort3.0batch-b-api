const UserRepository = require('./repository.js')
const { generateJwt } = require('../../utils/jwt.js');
const { sendAccountCreatedEmail, decryptToken } = require('./helpers.js')

/**
 * Sign up a new user with the provided email and password.
 *
 * @param {import('express').Request} req - The Express.js request object containing the user's information in the request body.
 * @param {import('express').Response} res - The Express.js response object to send the response.
 *
 * @returns {Promise<void>}
 *
 * @throws {string} If the user already exists or an error occurs during the signup process.
 */
const signup = async (req, res) => {
  try {
    // collect json object from request body
    const { email, password } = req.body

    // check if the user already exist
    let userExists = await UserRepository.userExists(email)

    if (userExists) {
      throw "User already exists"
    }

    // hash the user password
    let hashedPassword = await hashFunction(password)

    // save user to the db
    let newUser = await UserRepository.create(email, hashedPassword)

    delete newUser.password // delete the password from the saved db response

    let generatedLink = await sendAccountCreatedEmail(newUser) // send account created email

    newUser.link = generatedLink // take this off later

    Response.success(res, 200, null, newUser)

  } catch (err) {
    Response.error(res, 500, err)
  }
}

const verifyAccount = async (req, res) => {
  try {
    // collect the token from the request
    const { token } = req.params

    // decrypt token to get the user id
    let user_id = decryptToken(token)

    // optimise this code to avoid sending db queries twice
    // (e.g add expiry value to the link (jwt) instead)

    // update the user status record to TRUE
    let update = await UserRepository.updateUserStatus(user_id)
    log(update)

    Response.success(res, 200, "user is now activated")
  } catch (err) {
    Response.error(res, 500, err.message)
  }

}

/**
 * Log in a user and issue JWT tokens (access and refresh tokens).
 *
 * @param {import('express').Request} req - The Express.js request object containing user credentials.
 * @param {import('express').Response} res - The Express.js response object to send the response.
 *
 * @returns {Promise<void>}
 *
 * @throws {string} If login fails due to incorrect credentials.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate the user based on email and password (you should add your own authentication logic here)
    const user = await UserRepository.authenticate(email, password);

    if (!user) {
      throw "Authentication failed. Incorrect credentials.";
    }

    // If authentication succeeds, issue JWT tokens
    const accessToken = generateJwt(user.id);

    // Store the refresh token in a secure way, e.g., in a database or encrypted in a secure cookie

    // Return the access token to the client
    Response.success(res, 200, 'Login successful', { accessToken });
  } catch (err) {
    Response.error(res, 401, err.message);
  }
};


module.exports = {
  login, signup, verifyAccount
}
