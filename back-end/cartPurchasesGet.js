import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: 'cart-and-purchases',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      userId:event.requestContext.identity.cognitoIdentityId,
      productId: event.pathParameters.id
    },
  };

  const result = await dynamoDb.get(params);
  // Return the retrieved item
  return result.Item;
});