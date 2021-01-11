import AWS from 'aws-sdk';

const htmlTemplate = (data) => {
    return `
      <p><strong>Name:</strong> ${data.pathParameters}</p>
      <p><strong>Message:</strong> Produto reservado!</p>
    `;
  };

const sendMail = (sender, receivers, data) => {
  const params = {
    Destination: {
      ToAddresses: receivers
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: 'Website Enquiry'
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlTemplate(data)
        }
      }
    },
    Source: sender,
  };

  const sendPromise = new AWS.SES().sendEmail(params).promise();

  return sendPromise
    .then((data) => data)
    .catch((err) => {
      throw new Error(err);
    });
};

export default {
  sendMail
};