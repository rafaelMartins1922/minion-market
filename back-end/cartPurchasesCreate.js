import dynamoDb from "./libs/dynamodb-lib";
import handler from "./libs/handler-lib";
import mailer from './mailer';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  if(data.productStatus == "bought"){
    await mailer.sendMail('rafael.martins@poli.ufrj.br',[data.email],data);
  }
  const params = {
    TableName: 'cart-and-purchases',
    Item: {
        // The attributes of the item to be created
        userId:event.requestContext.identity.cognitoIdentityId,
        productId: data.productId, // A unique uuid
        productName: data.productName, // Parsed from request body
        description: data.description, // Pared from request body
        amount: parseInt(data.amount), // Parsed from request body
        unitPrice: parseFloat(data.unitPrice), // Parsed from request body
        photos: data.photos, // Parsed from request body,
        productStatus: data.productStatus
      },
  };
  await dynamoDb.put(params);
  return [event.requestContext.identity.cognitoIdentityId,data];
});