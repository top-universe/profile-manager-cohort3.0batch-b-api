const { encrypt, decrypt } = require('../../utils/helpers')

exports.sendAccountCreatedEmail = async (user) => {
  try {
    let generatedLink = await generateLink(user)
    const emailContent = {
      to: user.email,
      subject: 'Welcome to profile manager',
      body: `Your account was created successfully, click here to activate your account ${generatedLink}`,
    };
    Events.emailEmitter.emit('sendEmail', emailContent);
    return generatedLink
  } catch (err) {
    throw err.message
  }
}

async function generateLink(user) {
  try {
    let dataToEncrypt = {
      id: user.id,
      email: user.email
    }

    const userEncrypt = encrypt(dataToEncrypt)
    const link = `${process.env.HOST}/verify/${userEncrypt}`
    log(link)
    return link
  } catch (err) { throw err.message }
}


exports.decryptToken = (token) => {
  let value = decrypt(token)
  return value
}
