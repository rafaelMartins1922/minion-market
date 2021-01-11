import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import AWS from 'aws-sdk';
import mailer from './mailer';

export const main = handler(async (event, context) => {
  AWS.config.update({region:'us-east-1'});
  console.log("antes do sedmail");
  await mailer.sendMail('rlm87978@gmail.com',['rafael.martins@poli.ufrj.br'],event);
  console.log("depois do sendmail");
  const params = {
    TableName: 'minions',
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      minionId: event.pathParameters.id
    },
  };
  await dynamoDb.delete(params);
  return {status:true};
});