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
        },
    };
    await dynamoDb.put(params);
    console.log(params);
  });
});

//$ npx aws-api-gateway-cli-test --username admin@example.com --password Passw0rd! --user-pool-id us-east-1_h8OwxGaNf --app-client-id 24lqm3m6kas6g7m8t4d610nkus --cognito-region us-east-1 --identity-pool-id us-east-1:6939d3de-cf4f-4d45-aa0a-8c6cd4d459d0 --invoke-url https://bno7lr9q5g.execute-api.us-east-1.amazonaws.com/prod --api-gateway-region us-east-1 --path-template /minions method POST --body "[{\"productName\":\"Pelúcia Eletrônica\",\"amount\":\"5\",\"unitPrice\":\"10.75\",\"photos\":\"minion-face.png\",\"description\":\"Pelúcia Eletrônica Jumbo Minion Toyng Meu Malvado Favorito - 42cm\"}, {\"productName\":\"Minion Bombeiro\",\"amount\":\"5\",\"unitPrice\":\"10.75\",\"photos\":\"minion-face.png\",\"description\":\"Pelúcia Minion Bombeiro Toyng Meu Malvado Favorito Universal com Som e Luz\"}, {\"productName\":\"Minions miniaturas\",\"amount\":\"5\",\"unitPrice\":\"100\",\"photos\":\"minion-face.png\",\"description\":\"Minions miniaturas\"},{\"productName\":\"Minions - Conjunto\",\"amount\":\"5\",\"unitPrice\":\"120.50\",\"photos\":\"minion-face.png\",\"description\":\"Minions - Conjunto Com 14 Miniaturas - Pronta Entrega\"},{\"productName\":\"Boneco minion usado\",\"amount\":\"5\",\"unitPrice\":\"30.90\",\"photos\":\"minion-face.png\",\"description\":\"Boneco infantil Minions Top Usado\"}]"