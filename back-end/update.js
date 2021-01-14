import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  console.log('UDPATEANDO');
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'products',
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      productId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET productName = :productName, amount = :amount, unitPrice = :unitPrice, photos = :photos, reserved = :reserved",
    ExpressionAttributeValues: {
      ":productName": data.productName || null,
      ":amount": data.amount || null,
      ":unitPrice": data.unitPrice || null,
      ":photos": data.photos || null,
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
