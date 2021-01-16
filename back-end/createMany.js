import dynamoDb from "./libs/dynamodb-lib";
import handler from "./libs/handler-lib";
import * as uuid from "uuid";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  data.forEach(async(element) => {
    const params = {
        TableName: 'products',
        Item: {
            // The attributes of the item to be created
            userId:event.requestContext.identity.cognitoIdentityId,
            productId: uuid.v1(), // A unique uuid
            productName: element.productName, // Parsed from request body
            description: element.description, // Pared from request body
            amount: parseInt(element.amount), // Parsed from request body
            unitPrice: parseFloat(element.unitPrice), // Parsed from request body
            photos: element.photos, // Parsed from request body,
            productStatus: element.productStatus
          },
      };
      await dynamoDb.put(params);
  });
  return [event.requestContext.identity.cognitoIdentityId,data];
});