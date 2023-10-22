require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const AWS_SES = new AWS.SES({ apiVersion: '2010-12-01' });

class MailService {
  static async send(data) {
    try {
      const params = {
        Source: 'noreply@topuniverse.org',
        Destination: {
          ToAddresses: [data.to],
        },
        Message: {
          Subject: {
            Data: data.subject,
          },
          Body: {
            Html: {
              Data: data.body,
            },
          },
        },
      };
      return AWS_SES.sendEmail(params).promise();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = { MailService };
