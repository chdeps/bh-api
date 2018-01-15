import AWS from "aws-sdk";
import credentials from "../config/credentials";

AWS.config.update({
  credentials,
  endpoint: "http://localhost:8000"
});

export default AWS.DynamoDB();
