import AWS from 'aws-sdk';

const htmlTemplate = (data) => {
    return `
      <p><strong>Message:</strong> O produto ${data.productName} foi reservado com o e-mail ${data.email}, número de cartão ${data.cardNumber}, pertencete a ${data.cardholder}, e será enviando para o seguinte enndereço: ${data.address}</p>
    `;
  };

const htmlTemplateMany = (data) => {
  return `<p>Olá, seus produtos no Minion's Market foram reservados!</p> `;
};

const sendMailMany = (sender, receivers, data) => {
  const params = {
    Destination: {
      ToAddresses: receivers
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: "Reserva de Produto no Minion's Market"
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlTemplateMany(data)
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

const sendMail = (sender, receivers, data) => {
  const params = {
    Destination: {
      ToAddresses: receivers
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: "Reserva de Produto no Minion's Market"
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
  sendMail,
  sendMailMany
};