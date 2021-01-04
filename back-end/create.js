import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
        // The attributes of the item to be created
        minionId: uuid.v1(), // A unique uuid
        productName: data.name, // Parsed from request body
        amount: data.amount, // Parsed from request body
        unitPrice: data.unitPrice, // Parsed from request body
        photos: data.photos, // Parsed from request body
      },
  };

  await dynamoDb.put(params);

  return params.Item;
});
