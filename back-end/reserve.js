import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import mailer from './mailer';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  await mailer.sendMail('rlm87978@gmail.com',['rafael.martins@poli.ufrj.br'],data);
  console.log(event);
  var accessToken = event['accessToken'];
  console.log(accessToken);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      minionId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "Set reserved = :reserved",
    ExpressionAttributeValues: {
      ":reserved":parseInt(data.reserved) || 0
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});
