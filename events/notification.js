const EventEmitter = require('events');
class NotificationEventEmitter extends EventEmitter { }

const emailEmitter = new NotificationEventEmitter();

// Event handler for sending an email
emailEmitter.on('sendEmail', async (content) => {
  try {
    const result = await MailService.send(content);
    log('Email sent successfully:', result);
  } catch (error) {
    console.log('Error sending email:', error);
  }
});

module.exports = emailEmitter
