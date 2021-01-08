import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: 'minions',
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      minionId: event.pathParameters.id
    },
  };
  const result = await dynamoDb.get(params);
  console.log(result.Item);
  const nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'emaildetestes222@gmail.com',
      pass: 'mudgodttzoksuhsh'
    }
  });
const date = new Date();
var mailOptions = {
    from: 'emaildetestes222@gmail.com',
    to:'ariel@wiselymed.com',
    subject: "Minions' Market - Reserva de produto.",
    text: `O produto ${result.Item.productName} foi reservado\n` + date.toString()
};
transporter.sendMail(mailOptions,function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('E-mail enviado: ' + info.response);
    }
});
  await dynamoDb.delete(params);
  return { status: true };
});