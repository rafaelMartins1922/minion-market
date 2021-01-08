const config = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "minion-photos",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://cz1ewc4ydf.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_iGsJMQE7A",
      APP_CLIENT_ID: "7h098asfd3bdlfa9jl1ufmj715",
      IDENTITY_POOL_ID: "us-east-1:f793c489-ffa1-428c-b737-94000d1a070e",
    },
  };
  export default config;