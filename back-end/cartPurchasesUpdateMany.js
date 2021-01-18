import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import mailer from './mailer';
export const main = handler(async (event, context) => {
  console.log('UDPATEANDO');
  const data = JSON.parse(event.body);
  let i = 0;
  await mailer.sendMailMany('rafael.martins@poli.ufrj.br',[data.email,'ariel@wiselymed.com'],data);
  while (i < data.minions.length) {
    const params = {
        TableName: 'cart-and-purchases',
        // 'Key' defines the partition key and sort key of the item to be updated
        Key: {
          userId:event.requestContext.identity.cognitoIdentityId,
          productId: data.minions[i].productId
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET productStatus = :status ",
        ExpressionAttributeValues: {
          ":status":"bought"
        },
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW",
      };
      await dynamoDb.update(params);
      i+=1;
  }
  return { status: true };
});
