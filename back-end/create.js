import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
export const main = handler((event, context) => {
  const data = JSON.parse(event.body);
  data.forEach(async (element) => {
    const params = {
      TableName: process.env.tableName,
      Item: {
          // The attributes of the item to be created
          minionId: uuid.v1(), // A unique uuid
          productName: element.productName, // Parsed from request body
          description: element.description, // Pared from request body
          amount: element.amount, // Parsed from request body
          unitPrice: element.unitPrice, // Parsed from request body
          photos: element.photos, // Parsed from request body
          reserved: parseInt(element.reserved)
        },
    };
    await dynamoDb.put(params);
    console.log(params);
  });
});