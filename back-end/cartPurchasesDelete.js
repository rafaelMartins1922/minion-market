import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: 'cart-and-purchases',
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId:event.requestContext.identity.cognitoIdentityId,
      productId: event.pathParameters.id
    },
  };
  await dynamoDb.delete(params);
  return {status:true};
});